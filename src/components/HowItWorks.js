import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone';
import {Link} from 'react-scroll';
import './../App.css';

const useStyles = makeStyles({
  wrapper: {
    width: "85%",
    margin: "auto",
    textAlign: "center"
  },
  littleSpace:{
    marginTop: "2.5rem",
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
  padding:"0"
 },

 details:{
  marginBottom:"15px",
  fontWeight: "600",
  lineHeight: "1",
  border: "double 6px",
  borderRadius: "15px",
  padding: "17px",
 },
 detailsItem:{
  fontWeight: "400",
 }
})
  export default function HowItWorks() {
    const classes = useStyles();
    
    return (
      <div id="howitworks" className={`${classes.wrapper}`}>
      <Typography variant="h2" className={classes.littleSpace} color="primary">
      <span><HowToRegTwoToneIcon  style={{fill: "#3b5998"}} /></span> How It Works
        </Typography>
        <Typography variant="h6" className={` ${classes.littleSpace} ${classes.disclaimer} `}> 
        <Typography variant="h6" className="littleSpace content" color="inherit">
      <ul className={`${classes.faqs}`}>
        <li className={`${classes.details}`}>1. <span className={`${classes.detailsItem}`}>Create a <a className="link" rel="noopener" href="https://www.wealthbase.com" target="_blank">Wealthbase</a> account.</span></li>
        <li className={`${classes.details}`}>2. <span className={`${classes.detailsItem}`}><span className="link"><Link  rel="noopener" to="register" spy={true} smooth={true} offset={-180} >Register</Link></span> for an upcoming competition on this site.</span></li>
        <li className={`${classes.details}`}>3. <span className={`${classes.detailsItem}`}>Receive the competition link at checkout and via email.</span></li>
        <li className={`${classes.details}`}>4. <span className={`${classes.detailsItem}`}>Join the competition and wait until it starts.</span></li>
      </ul>
      </Typography>
      </Typography>
      </div>
    );
  }


