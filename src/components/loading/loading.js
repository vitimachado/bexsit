import React from 'react';
import './loading.css';
import { useSelector } from 'react-redux';
import {CardLayout} from '../card-layout/card-layout'

export const Loading = () => {
    
    const load = useSelector(state =>  state.message.loading );
    //console.log("load", load);

    const loading = load ?
        (
            <CardLayout styles={{
                    card: {
                        width: 'fit-content',
                        position: 'fixed',
                        top: 100,
                        right: 20,
                        zIndex: 2
                    }            
                }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </CardLayout>
        )
    : null;

    return (
        <>        
            {loading}
        </>
    )
}