import React from 'react';
import './logo.css';
import logo from '../../assets/mmartan.png'
import Tooltip from '@material-ui/core/Tooltip';

export const Logo = ({styles}) => {

    let boxStyle = styles && styles.box ? styles.box : {};
    let spanStyle = styles && styles.span ? styles.span : {};

    return (

        <div className="logo" style={boxStyle}>
            <Tooltip title="bexsit" aria-label="bexsit">
                {/* <img src={logo} alt="mmartan" height="15" width="138"/> */}
                <span style={spanStyle}>bexsit</span>
            </Tooltip>
        </div>
    )
}