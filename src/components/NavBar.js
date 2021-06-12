import React, { useState, Component } from 'react';
import {
  AppBar,
  makeStyles,
  Tabs,
  Toolbar,
  Tab,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {Link} from 'react-scroll';
import DrawerComponent from './DrawerComponent';
import CustomBtn from './CustomBtn';
import logo from '../logo.png';
import logoMobile from '../logoMobile.png';
import logoMobile1 from '../logoMobile1.png';

const styles = makeStyles({
    bar:{
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width:'46%',
        float:'left',
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    menuItem: {
        color: "rgba(0, 0, 0, 0.87)",
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

const Navbar = () => {
  const classes = styles();
  const theme = useTheme(); //Get a copy of our default theme in our component so that we can access the breakpoints and pass the useMediaQuery
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
          <Typography>
          <img src={logoMobile1} className={classes.logo}/> 
          <img src={logoMobile} className={classes.logoMobile}/> 
          </Typography>
          {isMatch ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>
                <Typography variant="h6" className={classes.menuItem}>
                <Link  to="about" spy={true} smooth={true}  offset={-180} >About</Link>
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                <Link  to="register" spy={true} smooth={true} offset={-180} >Competitions</Link>
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    <Link  to="faqs" spy={true} smooth={true} offset={-180}>FAQs</Link>
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                <Link  to="contact" spy={true} smooth={true} offset={-180}>Contact Us</Link>
                </Typography>
                <CustomBtn txt="Register"/>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;