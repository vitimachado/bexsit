import React, { useState } from 'react';
import Card from '../card/card';
import {CardLayout} from '../card-layout/card-layout'
import { updateUrlPage } from '../../store/actions';
import { Link } from 'react-router-dom';

const CardList = (props) => {

    let {arrayCards, row, limit, page, data} = props;

    try {
        return arrayCards.map((item, index) => {
            return(
                <>
                    <Card arrayCards={item} key={index}/>

                </>
            );
        });
    } catch (error) {
        return (
            <>
                <CardLayout>
                    <strong style={{ margin: 'auto' }}>Aguardando Menssagens.</strong>
                </CardLayout>
            </>
            )
    }
}

export default CardList;