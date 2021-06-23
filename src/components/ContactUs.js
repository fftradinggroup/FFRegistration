import React from 'react';
import firebase from "./../firebase";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomBtn from './CustomBtn';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
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
      marginLeft: "15px",
      lineHeight: "3",
    },
    submitMsgComplete:{
     color: "#5f90bd",
     fontWeight: "bold"
    },
  }));

  export default function ContactUs() {
    const classes = useStyles();
 
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [confmessage, setConfmessage] = React.useState(false);
  
    const handleChange = (event) => {
      console.log(event);
      if (event.target.id == 'name'){
        setName(event.target.value);
        setConfmessage(false);
      }
      if (event.target.id == 'email'){
        // set email validation check here
        setEmail(event.target.value);   
        setConfmessage(false);     
      }
      if (event.target.id == 'details'){
        setDetails(event.target.value); 
        setConfmessage(false);       
      }            
    };  

    const createInquiry = () => {
      const inquiryRef = firebase.firestore().collection("inquiry");
      
      
      inquiryRef.add({
        "name":name,
        "email": email,
        "details": details
      })
      .then(function(docRef) {
        setName("");
        setEmail("");        
        setDetails("");        
        setConfmessage(true);
      })
      .catch(function(error) {
        confmessage = "Error sending message";
        setConfmessage(true);
        console.error("Error sending message: ", error);
      });
    }
    
    return (
      <div id="contact" className="wrapper">
      <Typography variant="h2" className={classes.littleSpace} color="primary">
      <span><ContactMailTwoToneIcon  style={{fill: "#3b5998"}} /></span> Contact Us</Typography>    
      <div className={classes.root}>
      <Typography variant="h6" className="disclaimer littleSpace content" color="inherit">
     To stay up-to date on the latest competition news and updates, please join the telegram group by <a rel="noopener" className="link" href="https://t.me/joinchat/Zf9_ltls2eFjNTgx" target="_blank">clicking here</a>. For other inquiries, please fill out the form below and you will be contacted shortly after.
   </Typography>    
      <div className={classes.contactForm}>
      <div className={classes.field}>
        <TextField
          id="name"
          label="Full Name"
          placeholder="Full Name"
          variant="outlined"
          onChange={handleChange}
          value={name}
        />
        </div>  
      <div className={classes.field}>
        <TextField
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          variant="outlined"
          onChange={handleChange}
          value={email}
        />
        </div>  
      <div className={classes.field}>
        <TextField
          id="details"
          label="Details"
          placeholder="Details"
          multiline
          rows={6}
          variant="outlined"
          onChange={handleChange}
          value={details}
        />
        </div>
        <div className={classes.submit}>
        <CustomBtn rel="noopener" type="submit" txt="Submit" onClick={createInquiry}/>
      {confmessage ? (
        <span className={`${classes.submitMsg} ${classes.submitMsgComplete}`}>Your message has been sent. Thank You!</span>
          ) : (
        <span className={`${classes.submitMsg}`}>Click Submit to send message.</span>
      )}
      </div>
      </div>

  
   <Typography variant="h4" className={` ${classes.littleSpace} ${classes.disclaimer} `}>  
     This group does not provide any financial advice and is not operated by a financial advisor or planner. All inquires should be competition related.
   </Typography>
   <Typography variant="h4" className={` ${classes.disclaimer} `}>  
     100K Trading Club is not in any partnership or agreement with Wealthbase or any of their affiliates.
   </Typography>              
      </div>
      </div> 
    );
  }


