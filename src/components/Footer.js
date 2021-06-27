import React from 'react'
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';
import {Link} from 'react-scroll';
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
          zIndex:"101",
          width: "100%",
          borderTop: "solid 1px #000",
          height:"7%",
         },
         '& .MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly':{
            paddingBottom:"16px",
         }
  },
})

function Footer() {
  const classes = styles();
    return (
        <BottomNavigation className={classes.root}>
          <BottomNavigationAction href="#about" value="Home" icon={<HomeIcon  style={{fill: "#3b5998"}} />}/>
          <BottomNavigationAction href="#register" value="Register" icon={<SportsEsportsIcon  style={{fill: "#3b5998"}} />}/>
          <BottomNavigationAction href="#faqs" value="FAQs" icon={<QuestionAnswerIcon  style={{fill: "#3b5998"}} />}/>
          <BottomNavigationAction href="#contact" value="Contact Us" icon={<EmailIcon  style={{fill: "#3b5998"}} />}/>
        </BottomNavigation>
)
}

export default Footer