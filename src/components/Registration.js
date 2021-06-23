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
      description: "...",
      price:"0.01",
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
        product.description = comp.desc; //items[0].desc;
        product.price = comp.entry_fee;//items[0].entry_fee;
        product.id = comp.id;
        setCompetions(comp);
        setLoading(false);
        setLoaded(true);
      });
      } catch (e){
        console.log(e);
      }
        setLoaded(true); 
    }
  

  function setPayment(){
      const createOrder =  (data, actions) => {
        return actions.order.create({
          purchase_units:[
            {
              description: product.description,
              amount: {
                currency_code: "USD",
                value: product.price
              }
            }
          ]
        });
      };

      const onApprove = async (data,actions) => {
        const order = await actions.order.capture();
        // Add a new document in collection "registrations" with ID 'LA'
         //const res = await db.collection('registrations').doc(product.id).set(data);
        setPaidFor(true);
        console.log(data);
        return actions.order.capture();
        // redirect to site
      };


      const onError = (err) => {
        console.log(err);
      };

    };

    useEffect(() => {
        // get competition data
        getCompetitions();
       // PayPal Script
       setPayment();
    },[]);

    
    let PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

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
                 <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
        onError={(err) => this.onError(err)}
      />
                </div>
                  ) : (
                    <Newsletter/>
                  )    
          )}
     </div>
    );
  }
