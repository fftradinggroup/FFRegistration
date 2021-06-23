import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "./../firebase";
import Grid from './Grid'
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
    const [loaded, setLoaded] = useState(false)
    const firebaseRef = firebase.firestore().collection("competitions");
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
      firebaseRef.onSnapshot((querySnapshot) => {
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
            setPaidFor(true);
            console.log("order");
            console.log(order);
            //return actions.order.capture();
            // redirect to site
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
  
    useEffect(() => {
        // get competition data
        getCompetitions();
      },[]);
    const paypalRef = React.useRef(null);

    return (  
        <div id="register" className="wrapper bigSpace">
        <div className={`${classes.wrapper}`}>
        { !loading && loaded ? (
        <Typography variant="h5" className={` ${classes.littleSpace}`}>  
          Register now to recieve an invitation to the next available competition held by our club. 
          </Typography>
        ) : (
          <Typography variant="h5" className={` ${classes.littleSpace}`}>  
          There are no availabe competitons at the moment. 
          </Typography>
        )}
        </div>
        {paidFor ? (
            <div>
            <h1>Congrats! you have secured entry to the Financial Freedom Trading Competition</h1>
            <Grid icon={<ConfirmationNumberIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Purchased" btnTitle="Go to Wealth Base" />
            </div>
          ) : (
           (!loading && loaded) ?(
              <div style={{textAlign:"center"}}>
              <Typography variant="h4" className={classes.littleSpace} color="primary">
                 <span key={competitions.id}>Win ${competitions.prize} in the {competitions.name} Competition!</span>
                 </Typography>
                 <span><ConfirmationNumberOutlinedIcon style={{fill: "#4360A6", height:"125", width:"125"}}></ConfirmationNumberOutlinedIcon></span>
                 <h2>Join for ${competitions.entry_fee}</h2>
                 <h3>Start: - End:</h3>
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
