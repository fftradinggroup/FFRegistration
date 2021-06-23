import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import Footer from './Footer'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './../App.css';

const useStyles = makeStyles({
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
    zIndex: "102",
    position: "relative",
    }
},
})
  export default function SocialFooter() {
    const classes = useStyles();
    
    return (
        <div className={classes.bigSpace}>
        <BottomNavigation className={classes.social}>
          <BottomNavigationAction rel="noopener" href="https://t.me/joinchat/Zf9_ltls2eFjNTgx" target="_blank" value="Telegram" icon={<TelegramIcon  style={{fill: "#3b5998"}} />}/>
          <BottomNavigationAction value="Facebook" icon={<FacebookIcon  style={{fill: "#1DA1F2"}}/>} />
          <BottomNavigationAction value="Twitter" icon={<TwitterIcon  style={{fill: "#1DA1F2"}}/>} />
          <BottomNavigationAction value="Instagram" icon={<InstagramIcon  style={{fill: " #C13584"}}/>} />
          <BottomNavigationAction value="YouTube" icon={<YouTubeIcon  style={{fill: "#c4302b"}}/>} />
        </BottomNavigation>
          <Footer/>
        </div>
    );
  }


