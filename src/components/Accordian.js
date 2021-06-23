import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone';
import './../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: 'double 6px #000',
    borderRadius: '15px',
    '& .MuiAccordion-rounded:hover':{
        backgroundColor: "#5f90bd",
        color:"#ffffff!important",
      },
      '& .MuiAccordion-root.Mui-expanded': {
        margin: '0',
    },
  },
  heading: {
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

    <div id="faqs" className="wrapper">
    <Typography variant="h2" className={classes.littleSpace} color="primary">
     <span><LiveHelpTwoToneIcon  style={{fill: "#3b5998"}} /></span> FAQ's
      </Typography>          
      <Typography variant="h5" className={classes.littleSpace} color="primary">
    <div className={classes.root}>
<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  variant="h5" color="" className={classes.heading}>What is 100K Trading Club? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6" color="inherit" className={classes.answer}>100k Trading Club is a group of investors gathered together on social media to educate new investors on trading within the different markets, as well as providing opportunities to compete in simulated trading competitions with friends and club members. Each competition is hosted on the Wealthbase app.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography  variant="h5"  color="" className={classes.heading}>What is Simulated Trading/Paper Trading? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6" color="inherit" className={classes.answer}>Simulated trading allows investors to practice or buying securities. Compete with friends in virtual stock market trading games while learning investing strategies and discovering new investments. Using paper money, investors have the opportunity to particapate in the markets without spending their own money.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography  variant="h5" color="" className={classes.heading}>What is Wealthbase? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color="inherit" className={classes.answer}>
            Wealthbase is "a social investing app" allowing users to play fantasy trading games with friends. With each game, the users net worth will start at $100,000. Wealthbase can help consumers learn how to invest and build wealth using simulated trading and investing. For more questions about Wealthbase, <a className="link" rel="noopener" href="https://intercom.help/wealthbase/en/" target="_blank">click here</a> to visit their FAQs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography  variant="h5" color="" className={classes.heading}>Do I have to provide my personal information to join? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6" color="inherit" className={classes.answer}> 
          To join the 100k Trading Club, you only need to follow us on social media and download the Wealthbase app. There is no club membership fee or any personal membership required to join. However, to participate in rewarding paper trading competitions, there will be a fee associated to enter the specific competition. 
            </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </Typography>
      </div>   
  );
}