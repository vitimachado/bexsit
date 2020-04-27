import React from 'react';
import './card-layout.css';

export const CardLayout = ({children, styles, classNames}) => {

    let cardClass = "card-1 card-up card-forum ";
    cardClass += classNames && classNames.card ? classNames.card : "";

    let cardStyle = styles && styles.card ? styles.card : {};
    let row2Style = styles && styles.row2 ? styles.row2 : {};

    return (

        <div className={cardClass} style={cardStyle}>
            <div className="card-body">
                <div className="row" style={{margin: 5}}>
                    <div className="col">        
                        <div className="row" style={row2Style}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}