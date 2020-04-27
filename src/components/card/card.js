import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Vote } from './vote-buttons'
import { Footer } from './footer-buttons'
import Avatar from '@material-ui/core/Avatar';
import './card.css';
import {DateFormat} from '../date-format/date-format';


export default function MediaCard(props) {
  let { arrayCards, noFooter } = props;

//console.log('aaaaaaaaaaa arrayCards', arrayCards, arrayCards.votes)
  
  const answer = noFooter ? null : (    
    <div className="col footer-buttons"><Footer data={ arrayCards }/></div>
  );

  return (

    <div className="card-1 card-up card-forum">
      <div className="card-body">
        <div className="row" style={{margin: 5}}>
          <div className="col">        
            <strong className="row">{ arrayCards.text }</strong> 
            <div className="row" style={{marginTop: 40}}>
              {answer}
              <div className="col footer-buttons" style={{fontSize: 10, display: 'contents', placeContent: 'flex-end'}}>
                <Avatar alt={arrayCards.userName} src="" style={{ fontSize: 10, width: 20, height: 20, marginRight: 10}}/> <span>{arrayCards.userName}</span>
              </div>
              <div className="col footer-buttons date"><DateFormat date={arrayCards.creationDate} /></div>
            </div>
          </div>
          <div className="col vote-column"><Vote votesObj={ arrayCards } /></div>
        </div>    
      </div>
    </div>
    
  );
}