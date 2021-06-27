import React from 'react';
import Typography from '@material-ui/core/Typography';
import './../App.css';

  export default function About() {    
    return (
        <div id="about" className="wrapper about">
          <Typography variant="h1" style={{fontWeight: "bold"}} className="bigSpace" color="primary">
             100K Trading Club
          </Typography>
          <Typography variant="h6" className="littleSpace content" color="inherit">
            You've been invited to join a paper trading club and competition on the Wealthbase app! You'll have the opportunity to do simulated trading through friendly and rewarding competitions with new and experienced investors. The competitions may consist of stocks, cryptocurrency, and/or ETF's.
          </Typography>
        </div>
    );
  }


