import React from 'react';
import firebase from "./../firebase";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomBtn from './CustomBtn';
import './../App.css';


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
           },
           '& .MuiInputLabel-outlined': {
              zIndex: '0',
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
    submit:{
     display: "inline-flex"
    },
    submitMsg:{
      width: "100%",
    },
    submitMsgComplete:{
     color: "#5f90bd",
     fontWeight: "bold"
    },
  }));

  export default function Newsletter() {
    const classes = useStyles();
    const [newsletteremail, setNewsletteremail] = React.useState('');
    const [confmessage, setConfmessage] = React.useState(false);
  
    const handleChange = (event) => {
      if (event.target.id == 'newsletteremail'){
        // set email validation check here
        setNewsletteremail(event.target.value);   
        setConfmessage(false);     
      }  
    };  

    const createLead = () => {
      const newsletterRef = firebase.firestore().collection("lead");
      newsletterRef.add({
        "email": newsletteremail,
      })
      .then(function(docRef) {
        setNewsletteremail("");  
        setConfmessage(true);
      })
      .catch(function(error) {
        confmessage = "Error sending message";
        setConfmessage(true);
        console.error("Error sending message: ", error);
      });
    }
    
    return (
      <div id="newsletter" className="wrapper">
      <div className={classes.root}>  
      <Typography variant="h4" className={classes.littleSpace} color="inherit">
      <span>Please subscribe to our newsletter or follow us on social media for more contest opportunities.</span> 
    </Typography>
      <div>
      <div className={classes.submit}>
      <div className={classes.field}>
        <TextField
          id="newsletteremail"
          type="email"
          label="Email"
          placeholder="Email"
          variant="outlined"
          onChange={handleChange}
          value={newsletteremail}
        />
        </div>  
        <CustomBtn rel="noopener" style={{marginLeft: "15px", marginTop: "13px"}} type="submit" txt="Subscribe" onClick={createLead}/>
      </div>
      {confmessage ? (
        <p className={`${classes.submitMsg} ${classes.submitMsgComplete}`}>You have been added. Thank You!</p>
          ) : (
        <p className={`${classes.submitMsg}`}></p>
      )}
      </div>     
      </div>
      </div> 
    );
  }


