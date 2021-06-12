import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Footer from './components/Footer'
import trading from './trading.jpg'
import './App.css';
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
//changes to imports 
import SecurityIcon from '@material-ui/icons/Security';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
require('dotenv').config();

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  about:{
    marginTop: "255px",
    ['@media (max-width:780px)']: { 
      marginTop: "190px"
      }
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})

function App() {
  const [competitions, setCompetions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const firebaseRef = firebase.firestore().collection("competitions");
  let product = {
    description: "...",
    price:"10",
    id:""
  };
  let order = {};
  function getCompetitions(){
    setLoading(true);
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
    });
  }

  useEffect(() => {
    // get competition data
      getCompetitions();
     // PayPal Script
        window.paypal
        .Buttons({
          createOrder: (data, actions) => {
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
          },
          onApprove: async (data,actions) => {
            const order = await actions.order.capture();
            // Add a new document in collection "registrations" with ID 'LA'
             //const res = await db.collection('registrations').doc(product.id).set(data);
            setPaidFor(true);
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(paypalRef.current);
    
  
  },[]);
  let paypalRef = React.useRef(null);
  const classes = styles(); 
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <div id="about" className={`${classes.wrapper} ${classes.about}`}>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
             Fincial Freedom Trading and Education
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
            With the Financial Freedom Trading Group, you'll have the opportunity to learn about trading through friendly paper trading competitions. The competitions may consist of stocks, cryptocurrency, and/or ETF's. Each competition is hosted on the Wealth Base app where you will be able to ask questions from within the competition club room.
          </Typography>
          <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<SecurityIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Secure" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<TrendingUpIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Performant" btnTitle="Show me More"/>
        </div>
        </div>
        <div id="register" className={`${classes.grid} ${classes.bigSpace}`}>
            {paidFor ? (
              <div>
              <h1>Congrats! you have secured entry to the Financial Freedom Trading Competition</h1>
              <Grid icon={<ConfirmationNumberIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Purchased" btnTitle="Go to Wealth Base" />
              </div>
            ) : (
              <div style={{textAlign:"center"}}>
               <h1>
                  <span key={competitions.id}>Win ${competitions.prize} in the {competitions.name} Competition!</span>
                 </h1>
                  <span><ConfirmationNumberOutlinedIcon style={{fill: "#4360A6", height:"125", width:"125"}}></ConfirmationNumberOutlinedIcon></span>
                  <h2>Join for ${competitions.entry_fee}</h2>
                  <h3>Start: - End:</h3>
                  <div 
                     ref={paypalRef}
                     id="paypal-button-container"
                     />
                 </div>
            )}
        </div>
        <div id="faqs" className={classes.wrapper}>
        <Typography variant="h4" className={classes.littleSpace} color="primary">
          FAQ's
          </Typography>          
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          What is Paper Trading? $100K What is Wealth Base? Do I have to provide my personal information to join?
          Register now to recieve an invitation to the next available competition. Contest registration closes 2 hours after the competition begins. Anyone not registered will be removed from the club room.
          </Typography>
          </div>        
          <div id="contact" className={classes.wrapper}>
          <Typography variant="h4" className={classes.littleSpace} color="primary">
           Contact US
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          Financial Freedom Trading Group does not provide financial advice. Please join the telegram group at t.me/joinchat/Zf9_ltls2eFjNTgx to stay connected with club members outside of the competitions. For other inquiries please send an email to.
          </Typography>          
          </div>  
        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
 }

export default App;