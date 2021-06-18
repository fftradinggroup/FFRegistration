import { Theme, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Footer from './components/Footer'
import trading from './trading.jpg'
import FAQAccordion from './components/Accordian'
import ContactUs from './components/ContactUs'
import './App.css';
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
//changes to imports 
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone';
import ContactSupportTwoToneIcon from '@material-ui/icons/ContactSupportTwoTone';
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import YouTubeIcon from '@material-ui/icons/YouTube';
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
    width: "85%",
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
  disclaimer:{
    fontWeight:"normal",
    color:"#333",
    fontSize:"0.9375rem",
    lineHeight: "1.2"
},
 faqs:{
  listStyleType: "none",
  textAlign: "left",
 },
 social:{
  ['@media (max-width:780px)']: { 
    zIndex: "1",
    position: "relative",
    }
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
             100K Trading Club
          </Typography>
          <Typography variant="h6" className={classes.littleSpace} color="primary">
            You've been invited to join a paper trading club competition on the Wealthbase app! You'll have the opportunity to do simulated trading through friendly and rewarding competitions with new and experienced investors. The competitions may consist of stocks, cryptocurrency, and/or ETF's.
          </Typography>
          {/*<div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<SecurityIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Secure" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<TrendingUpIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Performant" btnTitle="Show me More"/>
        </div>
    */}
        </div>
        <div id="howitworks" className={`${classes.wrapper}`}>
        <Typography variant="h4" className={classes.littleSpace} color="primary">
        <span><HowToRegTwoToneIcon  style={{fill: "#3b5998"}} /></span> How It Works
          </Typography>
          <Typography variant="h6" className={` ${classes.littleSpace} ${classes.disclaimer} `}> 
        <ul className={`${classes.faqs}`}>
          <li>1. Create a Wealthbase account.</li>
          <li>2. Register for an upcoming competition on this site.</li>
          <li>3. Recieve the competition link at checkout and via email.</li>
          <li>4. Join the competition and wait until it starts.</li>
        </ul>
        </Typography>        
        </div>
        <div id="register" className={`${classes.grid} ${classes.bigSpace}`}>
        <div className={`${classes.wrapper}`}>
        <Typography variant="h4" className={` ${classes.littleSpace} ${classes.disclaimer} `}>  
          Register now to recieve an invitation to the next available competition held by our club. 
          </Typography>
          </div>
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
         <span><LiveHelpTwoToneIcon  style={{fill: "#3b5998"}} /></span> FAQ's
          </Typography>          
          <Typography variant="h5" className={classes.littleSpace} color="primary">
            <FAQAccordion/>
          </Typography>
          </div>        
          <div id="contact" className={classes.wrapper}>
          <Typography variant="h4" className={classes.littleSpace} color="primary">
          <span><ContactSupportTwoToneIcon  style={{fill: "#3b5998"}} /></span> Contact US
          </Typography>
         <ContactUs/>     
          </div>  
        <div className={classes.bigSpace}>
        <BottomNavigation className={classes.social}>
          <BottomNavigationAction href="https://t.me/joinchat/Zf9_ltls2eFjNTgx" target="_blank" label="Telegram" value="Telegram" icon={<TelegramIcon  style={{fill: "#3b5998"}} />}/>
          <BottomNavigationAction label="Twitter" value="favorites" icon={<FacebookIcon  style={{fill: "#1DA1F2"}}/>} />
          <BottomNavigationAction label="Twitter" value="favorites" icon={<TwitterIcon  style={{fill: "#1DA1F2"}}/>} />
          <BottomNavigationAction label="Instagram" value="nearby" icon={<InstagramIcon  style={{fill: " #C13584"}}/>} />
          <BottomNavigationAction label="YouTube" value="folder" icon={<YouTubeIcon  style={{fill: "#c4302b"}}/>} />
        </BottomNavigation>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
 }

export default App;