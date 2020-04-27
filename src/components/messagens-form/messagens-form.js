import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SAVE_MESSAGE } from '../../store/actions/actionTypes';
import { setQuestion, setAnswer, refreshHome } from '../../store/actions';
import './messagens-form.css';

export const MessagensForm = ({message, questionAnswers, question, onClose}) => {

    //console.log('message, question', message, question);

    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState('');
    
    const handleChange = (e) => {
        let value = e.target.value;
        setValue(value);
        if(value.length > 0) setDisabled(false);
        else setDisabled(true);
    };

    const handleClick = (e) => {

        if(message) {
            message = { answer: { ...message, text: value }, questionAnswers };
            //console.log('message = { answer: { ...message, text: value }, questioId }', message, questionAnswers);
            setAnswer(message).then((res) => { if(res && !res.error ){ refreshHome(value); setValue(""); } });
        } else if(question) {
            question.text = value;
            setQuestion(question).then((res) => { if(res && !res.error ){ refreshHome(value); onClose(); } });
        }
    };    
    
    return (
        <>
            <div className="row">
                <div className="col">
                    <form noValidate autoComplete="off">                        
                        <TextField
                            id="standard-multiline-flexible"
                            label="Escreva sua Mensagem"
                            multiline
                            rowsMax={4}
                            value={value}
                            onChange={handleChange}
                            style={{width: '-webkit-fill-available'}} 
                        />
                    </form>
                </div>
                <div className="">
                    <Fab size="small" type="text" color="primary" aria-label="add" style={{zIndex: 1, background: '#4bde95'}}
                                        disabled={disabled} onClick={() => handleClick()}>
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        </>
    )
}
