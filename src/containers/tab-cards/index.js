import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import CardList from '../../components/card-list/card-list';
import { clearSearch, getTagProdutos, getProdutos } from '../../store/actions';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import './tab-cards.css'
   
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(8)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TabCards() {
  const classes = useStyles();
  const [arrayCards, setArrayCards] = useState();

  let params = useParams();
  let location = useLocation();
  let history = useHistory();

  let pathname = location.pathname.split("/");  
  
  useEffect(() => {
    getTagProdutos(pathname[3]).then((res) => { if(res && !res.error ) setArrayCards(res.data); });  
  }, []);

  return (
    <div className={classes.root}>
      <div className="container">
        <CardList row={5} page={pathname[pathname.length]} arrayCards={arrayCards}/>
      </div>
    </div>
  );
}