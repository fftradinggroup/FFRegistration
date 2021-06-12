import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    textAlign:"left",
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
  }
}));

export default function FAQAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What is Paper Trading? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.answer}>
          $100K
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What is Wealth Base? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.answer}>
            Do I have to provide my personal information to join?
          Register now to recieve an invitation to the next available competition. Contest registration closes 2 hours after the competition begins. Anyone not registered will be removed from the club room.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Do I have to provide my personal information to join? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.answer}> 
          Register now to recieve an invitation to the next available competition. Contest registration closes 2 hours after the competition begins. Anyone not registered will be removed from the club room.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h4" className={` ${classes.littleSpace} ${classes.disclaimer} `}>  
          Register now to recieve an invitation to the next available competition. Contest registration closes 2 hours after the competition begins. Anyone not registered will be removed from the club room.
          </Typography>



    </div>
  );
}