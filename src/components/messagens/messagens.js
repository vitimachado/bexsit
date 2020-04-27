import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '../card/card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import {DateFormat} from '../date-format/date-format'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { likeAnswer, refreshMessage } from '../../store/actions'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

export default function Messagens({data}) {
  const classes = useStyles();  
  const answersData = data;
  const [like, setLike] = useState(false);

  const user = useSelector(state => state.users.user);
  useEffect(() => {
    //console.log('uuuuuuuuuuuuuuuuuuuuuuuu useEffect', answersData.id, user.likes, like);
    if(user.likes.includes(answersData.id)) setLike(true);
    else setLike(false);
    //console.log('uuuuuuuuuuuuuuuuuuuuuuuu answersData', answersData, user, like);
  }, [answersData, user])
/*   
creationDate: "2020-04-26T20:50:04.531Z"
id: "qacsvyp2rW7Fbs5iLtND"
likes: 0
questionId: "Xk86O1tije3gSsgZp7H6"
text: "Teste 111111111a"
user: "another.username"
userId: "mDEagDMZruscUQ7S7rMU"
userName: "Vitor"
*/
  const handleLikeAnswer = () => {
    
  //console.log('handleLikeAnswer', answersData.likes);
  if(like) {
    answersData.likes = answersData.likes-1;
    user.likes =  user.likes.filter(e => e !== answersData.id);
  }
  else {
    answersData.likes = answersData.likes+1;
    user.likes = [ ...user.likes, answersData.id ];
  }
  //console.log('handleLikeAnswer 1', like, answersData.likes);

    likeAnswer({ ...answersData, user }).then(async (res) => 
    { 
      //console.log('handleLikeAnswer user', res);
      if(res && res.data && !res.error ) {        
        //setLike(!like);
        refreshMessage({ answersId: answersData.id, userId: answersData.userId });
      }
    });
  }

  return (
      <>
      <List className={classes.root}>     
        <div className="row">
          <div className="col">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={answersData.userName} src="/static/images/avatar/1.jpg" 
                  style={{
                    fontSize: 'smaller',
                    height: 30,
                    width: 30
                  }}/>
              </ListItemAvatar>
              <ListItemText style={{ marginTop: 10 }}
                primary={answersData.text}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {answersData.userName} 
                    </Typography>
                    <span>{" — "} <DateFormat date={answersData.creationDate} /></span>                
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className="col" style={{textAlignLast: 'end'}}>
            <div className="row like-button">
              <div className="col">                
                <Button Button style={{minWidth: 0}} className="" onClick={handleLikeAnswer}>
                    <Tooltip title="Curtir" aria-label="Cutir">
                      { like ? <FavoriteIcon style={{ color: '#4BDE95' }}/> : <FavoriteBorderIcon />}
                    </Tooltip>
                </Button>
              </div>
            </div>
            <div className="row like-score">
              <div className="col" style={{ paddingRight: 30 }}>                
                <span style={{ fontSize: 'smaller'}}>{answersData.likes}</span>
              </div>
            </div>
          </div>
        </div>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}