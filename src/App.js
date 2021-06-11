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
        <div id="about" className={classes.wrapper}>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
             Fincial Freedom Trading and Education
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
            Here you will confirm your seat into the upcoming trading competitions.
          </Typography>
        </div>
        <div className={`${classes.grid} ${classes.bigSpace}`}>
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
                  <div 
                     ref={paypalRef}
                     id="paypal-button-container"
                     />
                 </div>
            )}
        </div>
        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
 }

export default App;