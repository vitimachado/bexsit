import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardList from '../../components/card-list/card-list';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { getQuestions, getParam } from '../../store/actions';
import { QuestionForm } from '../../components/questions-form/questions-form'
import './home.css';
import SideBar from '../sideBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: '20px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function HomeCards({ row }) {

  let location = useLocation();
  const [arrayCards, setArrayCards] = useState();
  
  let data =  getParam('data');
  let page = getParam('page');

  const classes = useStyles();
  const state = useSelector(state => state.search );
  const home = useSelector(state => state.search.home );
  
  useEffect(() => {
    let data =  getParam('data');
    getQuestions(data).then((res) => 
    { 
      if(res && !res.error ) setArrayCards(res.data);
      else setArrayCards();
    });  
  }, [home]);

  return data != "null" ?
    (
      <>     
        <div className="row" className="searchBox">
            <div className="col" className="search-container">
                {data ? data : 'Popular posts' } 
            </div>
        </div>
        <div className="card-container">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <QuestionForm />
                        <CardList arrayCards={arrayCards}/>
                    </div>
                    <div className="col-4 sidebar-col">
                        <SideBar />
                    </div>
                </div>                
            </div>
        </div>
          
      </>
    )
  : null;
}