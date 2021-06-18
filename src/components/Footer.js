import React from 'react'
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';import {Link} from 'react-scroll';
import TelegramIcon from '@material-ui/icons/Telegram';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmailIcon from '@material-ui/icons/Email';


const styles = makeStyles({
  root:{
        display: "none",
        ['@media (max-width:780px)']: { 
          display: "flex",
          position: "fixed",
          bottom: "0",
          zIndex:"0",
          width: "100%",
         }
  },
})

function Footer() {
  const classes = styles();
    return (
        <BottomNavigation className={classes.root}>
          <Link  to="about" spy={true} smooth={true} offset={-180} ><BottomNavigationAction href="#about" label="Home" value="Home" icon={<HomeIcon  style={{fill: "#3b5998"}} />}/></Link>
          <Link  to="register" spy={true} smooth={true} offset={-180} ><BottomNavigationAction href="#register" label="Register" value="Register" icon={<SportsEsportsIcon  style={{fill: "#3b5998"}} />}/></Link>
          <Link  to="faqs" spy={true} smooth={true} offset={-180} ><BottomNavigationAction href="#faqs" label="FAQs" value="FAQs" icon={<QuestionAnswerIcon  style={{fill: "#3b5998"}} />}/></Link>
          <Link  to="contact" spy={true} smooth={true} offset={-180} ><BottomNavigationAction href="#contact" label="Contact Us" value="Contact Us" icon={<EmailIcon  style={{fill: "#3b5998"}} />}/></Link>
        </BottomNavigation>
)
}

export default Footer