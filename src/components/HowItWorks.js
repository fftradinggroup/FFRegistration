import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CustomBtn from './CustomBtn';


const useStyles = makeStyles((theme) => ({
    root: {
     },
  }));

  export default function HowItWorks() {
    const classes = useStyles();
 
    const [value, setValue] = React.useState('Controlled');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };  
    
    return (
      <div className={classes.root}>
    <Typography variant="h4" className={` ${classes.littleSpace} ${classes.disclaimer} `}>  
   </Typography>    
      </div>
    );
  }


