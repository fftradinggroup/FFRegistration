import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {Link} from 'react-scroll';
import DrawerComponent from './DrawerComponent';
import CustomBtn from './CustomBtn';
import logo from '../logo.png';

const styles = makeStyles({
    bar:{
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column",
           display:"none",
          }
    },
    headerNav:{
      borderBottom: "solid 1px black",
    },
    logo: {
        marginTop:"10px",
        width:'46%',
        float:'left',
        paddingBottom: "3px",
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "60%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    menuItem: {
        color: "rgba(0, 0, 0, 0.87)",
        cursor: "pointer", 
        flexGrow: 1,
        margin: "0px 10px",
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
      <AppBar className={classes.headerNav} elevation={0}>
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
        <Link  to="about" spy={true} smooth={true} offset={-180} >
          <Typography>
          <img src={logo} alt="Diamond Laurel Logo" className={classes.logo}/> 
          <img src={logo} alt="Diamond Laurel Logo" className={classes.logoMobile}/> 
          </Typography>
          </Link>
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
                <Link  to="register" spy={true} smooth={true} offset={-180} ><CustomBtn txt="Register"/></Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;