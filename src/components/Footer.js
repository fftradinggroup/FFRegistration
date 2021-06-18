import React from 'react'
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';
import CustomBtn from './CustomBtn';
import {Link} from 'react-scroll';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
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
          <BottomNavigationAction href="https://t.me/joinchat/Zf9_ltls2eFjNTgx" target="_blank" label="Telegram" value="Telegram" icon={<TelegramIcon  style={{fill: "#3b5998"}} />}/>
          {/*
          <BottomNavigationAction label="Twitter" value="favorites" icon={<TwitterIcon  style={{fill: "#1DA1F2"}}/>} />
          <BottomNavigationAction label="Instagram" value="nearby" icon={<InstagramIcon  style={{fill: " #C13584"}}/>} />
          <BottomNavigationAction label="YouTube" value="folder" icon={<YouTubeIcon  style={{fill: "#c4302b"}}/>} />
           */
          }
        </BottomNavigation>
)
}

export default Footer