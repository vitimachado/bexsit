import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterListIcon from '@material-ui/icons/FilterList';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import Fab from '@material-ui/core/Fab';
import { MessagensForm } from '../messagens-form/messagens-form';
import Modal from '@material-ui/core/Modal';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import { CardLayout } from '../card-layout/card-layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProdutos, updateUrlSearch, clearSearch, redirect, getParam } from '../../store/actions';
import HomeIcon from '@material-ui/icons/Home';
import './question-form.css'

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

export const QuestionForm = ({data}) => {

    const dataSearch = getParam('data');
    const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => { setSearch(dataSearch) }, [dataSearch]);

    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleChange(e) {
        const { value } = e.target;
        setSearch(value);
    };

    const handleSubmit = () => {
        //console.log('handleSubmit', search);
        dispatch({ type: 'UPDATE_LIST', data: {search}, page: updateUrlSearch(search, 1) });
    }


    const redirectHome = () => {
        //console.log('handleSubmit', search);
        redirect('/');
    }
    
    
    let question = {
        text: '',
        userId: 1,
        userName: "username",
        creationDate: new Date(),
        votes: 0,
        answers: 0
      }

      const classes = useStyles();

      return (
        <>
            <Paper className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu" onClick={redirectHome}>
                    <HomeIcon />
                </IconButton>
                <InputBase
                        value={search}
                        onChange={handleChange}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit(); } }
                        className={classes.input}
                        placeholder="Buscar"
                        inputProps={{ 'aria-label': 'Buscar' }}
                    />
                <IconButton className={classes.iconButton} aria-label="find" onClick={() => handleSubmit()}>
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />          
                <Fab size="small" type="text" color="primary" aria-label="add" style={{zIndex: 1, background: '#4bde95'}} onClick={() => handleOpen()}>
                    <AddCommentOutlinedIcon />
                </Fab>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >                
                <CardLayout classNames={{ card: "vertical-center" }}>
                    <div style={{ width: '-webkit-fill-available' }}>
                        <div className="card-title">Adicionar uma nova pergunta.</div>
                        <Divider style={{ marginBottom: 50 }}/>   
                        <MessagensForm  className="vertical-center" question={question} onClose={handleClose} /> 
                    </div>                               
                </CardLayout>
            </Modal>
        </>
      );
}