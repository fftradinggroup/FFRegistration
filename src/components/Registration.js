import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "./../firebase";
import CustomBtn from './CustomBtn';
import './../App.css';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import './../App.css';
import Newsletter from './newsletter';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
          width: '100%',
        },
        '& .MuiOutlinedInput-root': {
              width: '100%',
            },
        '& .MuiFormControl-root': {
              width: '100%',
           }
      },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
      textAlign:"left",
    },
    bigSpace: {
        marginTop: "5rem"
      },
    littleSpace:{
      marginTop: "2.5rem",
    },
    question:{
  
    },
    answer:{
      textAlign:"left",
    },
    disclaimer:{
        fontWeight:"normal",
        color:"#333",
        fontSize:"0.9375rem",
        lineHeight: "1.2"
    },
    contactForm:{
        textAlign:"left",
        width:"65%",
        ['@media (max-width:780px)']: { 
            width:"100%",
           }
    },
    field:{
     marginBottom: "10px",
     width: "100%"
    },
  }));


  export default function Registration() {
    const classes = useStyles();
    const [competitions, setCompetions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [confmessage, setConfmessage] = useState(false);
    const competitionRef = firebase.firestore().collection(process.env.REACT_APP_FIREBASE_COMPETITIONREF);
    let product = {
      name: "Competitions",
      description: "...",
      price:"10",
      id:""
    };
    let order = {};
    function getCompetitions(){
      setLoading(true);
      try{
        competitionRef.onSnapshot((querySnapshot) => {
        //const items = [];
        const comp = querySnapshot.docs[0].data();
        /*querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        */
        product.name = comp.name;
        product.description = comp.desc; //items[0].desc;
        product.price = comp.entry_fee;//items[0].entry_fee;
        product.id = comp.id;
        console.log(comp);
        setCompetions(comp);
        setLoading(false);
        setLoaded(true);
       // PayPal Script
        window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units:[
                {
                  description: product.name,
                  amount: {
                    currency_code: "USD",
                    value: product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data,actions) => {
            const order = await actions.order.get();
            createRegistration(order);
            setPaidFor(true);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(paypalRef.current);
      });
      } catch (e){
        console.log(e);
      }
        setLoaded(true); 
    }
  
    const createRegistration = (reg) => {
      const registrationRef = firebase.firestore().collection(process.env.REACT_APP_FIREBASE_REGISTRATIONREF);
      registrationRef.add({
        "order_id": reg["id"],
        "intent": reg["intent"], 
        "status": reg["status"], 
        "create_time": reg["create_time"],
        "email_address": reg["payer"].email,
        "payer_id": reg["payer"].id,
        "value": product.price,
        "description": product.description,
        "full_name": reg["name"].fullname,
        "competition": product.name
      })
      .then(function(docRef) {
        setConfmessage(true);
                    // return orderid
      })
      .catch(function(error) {
        registrationRef.add({
          "error": error,
        });
        setConfmessage(false);
        console.error("Error: ", error);
      });
    }


    useEffect(() => {
        // get competition data
        getCompetitions();
      },[]);
    const paypalRef = React.useRef(null);

    return (  
        <div id="register" className="wrapper bigSpace">
        <div className={`${classes.wrapper}`}>
        { !loading && loaded ? (
                (paidFor ? (
                  <span></span>
              ):( 
                <Typography variant="h5" className={` ${classes.littleSpace}`}>  
                Register now to recieve an invitation to the next available competition held by our club. 
                </Typography>
              ))
        ) : (
          <Typography variant="h5" className={` ${classes.littleSpace}`}>  
          There are no availabe competitons at the moment. 
          </Typography>
        )}
        </div>
        {paidFor ? (
            <div>
           (confmessage) ? (
              <h1>Congrats! you have secured entry to the Trading Competition.</h1>
                  <CustomBtn  txt="Go to Competition" link={competitions.link} />
                 ) : (
                <h1>Something went wrong. Please try again.</h1>
                <CustomBtn  txt="Try Again" onClick={setConfmessage(false)} />
              )
            </div>
          ) : (
           (!loading && loaded) ?(
              <div style={{textAlign:"center"}}>
              <Typography variant="h4" className={classes.littleSpace} color="primary">
                 <span key={competitions.id}>Win ${competitions.prize} in the {competitions.name} Competition!</span>
                 </Typography>
                 <span><ConfirmationNumberOutlinedIcon style={{fill: "#4360A6", height:"125", width:"125"}}></ConfirmationNumberOutlinedIcon></span>
                 <h2>Join for ${competitions.entry_fee}</h2>
                 <h3>Duration: {new Date(competitions.start_time.seconds * 1000).toLocaleDateString("en-US")} - {new Date(competitions.end_time.seconds * 1000).toLocaleDateString("en-US")}</h3>
                 <div 
                     ref={paypalRef}
                     id="paypal-button-container"
                     />
                </div>
                  ) : (
                    <Newsletter/>
                  )    
          )}
     </div>
    );
  }
