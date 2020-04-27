import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function SideBarList() {
  const classes = useStyles();

  return (
    <div className="card-1">
        <div class="card-header">Assuntos Mais Comentados</div>
        <div class="card-body">
            <div class="list-group">
                <a href="#" className="list-group-item list-group-item-action" style={{borderStyle: 'none none solid none'}}>
                    <ListItem alignItems="flex-start" style={{padding: 0}}>
                        <strong>1</strong>
                        <ArrowDropUpIcon style={{color: '#4BDE95'}}/>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 30, height: 30, marginRight: 10}}/> <span>b/test</span>
                    </ListItem>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{borderStyle: 'none none solid none'}}>
                    <ListItem alignItems="flex-start" style={{padding: 0}}>
                        <strong>2</strong> <ArrowDropUpIcon style={{color: '#4BDE95'}}/> <Avatar alt="Aemy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 30, height: 30, marginRight: 10}}/> <span>b/test</span>
                    </ListItem>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{borderStyle: 'none none solid none'}}>
                    <ListItem alignItems="flex-start" style={{padding: 0}}>
                        <strong>3</strong> <ArrowDropUpIcon style={{color: '#4BDE95'}}/> <Avatar alt="Eemy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 30, height: 30, marginRight: 10}}/> <span>b/test</span>
                    </ListItem>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{borderStyle: 'none none solid none'}}>
                    <ListItem alignItems="flex-start" style={{padding: 0}}>
                        <strong>4</strong> <ArrowDropUpIcon style={{color: '#4BDE95'}}/> <Avatar alt="Semy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 30, height: 30, marginRight: 10}}/> <span>b/test</span>
                    </ListItem>
                </a>
            </div>
        </div>
    </div>
  );
}