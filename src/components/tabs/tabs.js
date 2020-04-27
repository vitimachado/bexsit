import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './tab.css';

export default function TabsBar (props) {

    let location = useLocation();
    const dispatch = useDispatch();
    let pathname = location.pathname.split("/");
    const {tabs} = props;
    const styles = { textDecoration: 'none', color: 'black' };
    
    function handleTabButton (e, value) {        
        dispatch({ type: 'UPDATE_LIST', data: {} });
    };

    const tabList = tabs ? tabs.map((tab, index) => 
        <Link to={`/tab/${tab.title.toLowerCase()}/${tab.id}/1`} key={tab.id} className="link-tab">
            <Button id={tab.id} onClick={(e) => handleTabButton(e, tab.id)} className="font-tab" 
                style={
                    tab.id === pathname[3] ? { borderBottom: '5px solid #806c5c', borderRadius: 'initial', outline: '0px' }  : {}         
                }>            
                {tab.title.toUpperCase()}
            </Button>
        </Link>) 
    : null;

    return tabList;
}