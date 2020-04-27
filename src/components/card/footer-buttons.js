import React, {useState} from 'react';
import './card.css';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import Modal from '@material-ui/core/Modal';
import {MessagensList} from '../messagens-list/messagens-list';

export const Footer = ({data}) => {

    const [open, setOpen] = useState(false);
    //console.log('aaaaaaaaaaa Footer', data)

    const handleOpen = () => {
        //console.log('handleOpen')
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
        <>
            <Button className="font-size-small" onClick={() => handleOpen()}>
                <TextsmsOutlinedIcon  style={{ fontSize: 15, marginRight: 5 }}/>
                {data.answers} { data.answers > 1 ? ' mensagens' : ' mensagem'}
            </Button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MessagensList data={data}/>
            </Modal>
        </>
    )
}