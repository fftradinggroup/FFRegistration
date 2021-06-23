import { Theme, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import NavBar from './components/NavBar'
import FAQAccordion from './components/Accordian'
import ContactUs from './components/ContactUs'
import Registration from './components/Registration'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import SocialFooter from './components/SocialFooter'
import './App.css';
import React from "react";
//changes to imports 
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

function App() {
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
         <About/>
         <HowItWorks/>
         <Registration/> 
         <FAQAccordion/>   
         <ContactUs/>           
         <SocialFooter/>
      </ThemeProvider>
    </div>
  );
 }

export default App;