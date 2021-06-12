import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CustomBtn from './CustomBtn';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
          width: '100%',
        },
        '& .MuiOutlinedInput-root': {
              width: '100%',
            },
        '& .MuiFormControl-root': {
              width: '100%',
           }
     
      },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
      textAlign:"left",
    },
    bigSpace: {
        marginTop: "5rem"
      },
    littleSpace:{
      marginTop: "2.5rem",
    },
    question:{
  
    },
    answer:{
      textAlign:"left",
    },
    disclaimer:{
        fontWeight:"normal",
        color:"#333",
        fontSize:"0.9375rem",
        lineHeight: "1.2"
    },
    contactForm:{
        textAlign:"left",
        width:"65%",
        ['@media (max-width:780px)']: { 
            width:"100%",
           }
    },
    field:{
     marginBottom: "10px",
     width: "100%"
    },
  }));

  export default function ContactUs() {
    const classes = useStyles();
 
    const [value, setValue] = React.useState('Controlled');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };  
    
    return (
      <div className={classes.root}>
     

     <form className={`${classes.root} ${classes.contactForm} ${classes.littleSpace}`} noValidate autoComplete="off">
      <div>
      <div className={classes.field}>
        <TextField
          id="outlined-textarea"
          label="Full Name"
          placeholder="Full Name"
          variant="outlined"
        />
        </div>  
      <div className={classes.field}>
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          variant="outlined"
        />
        </div>  
      <div className={classes.field}>
        <TextField
          id="outlined-multiline-static"
          label="Details"
          placeholder="Details"
          multiline
          rows={6}
          variant="outlined"
        />
        </div>
      </div>
      <CustomBtn txt="Submit"/>
    </form>

     <Typography variant="h4" className={` ${classes.littleSpace} ${classes.disclaimer} `}>  
     Financial Freedom Trading Group does not provide financial advice. Please join the telegram group at t.me/joinchat/Zf9_ltls2eFjNTgx to stay connected with club members outside of the competitions. For other inquiries please send an email to.
   </Typography>     
  
  
      </div>
    );
  }


