import React  from 'react';
import * as moment from 'moment'

export const DateFormat = ({date}) => {
    return (<span>{moment(new Date(date)).format('HH:mm:ss DD/MM/YYYY')}</span>)
    
}