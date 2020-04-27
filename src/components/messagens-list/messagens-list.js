import React, { useEffect, useState } from 'react';
import { CardLayout } from '../card-layout/card-layout';
import Card from '../card/card';
import { MessagensForm } from '../messagens-form/messagens-form';
import Messagens from '../messagens/messagens';
import { getAnswers } from '../../store/actions';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';

export const MessagensList = ({data}) => {

    const { id, answers } = data;
    const [messages, setMessages] = useState(null);
    const answer = useSelector(state => state.search.answer );
    
    useEffect(() => {
        getAnswers(id).then(async (res) => 
        { 
          if(res && res.data && !res.error ) {
            
                //console.log('getAnswers(id).then(async (res)', res);

                const sortedActivities = await res.data.sort((a, b) =>  new Date(b.creationDate) - new Date(a.creationDate))

                const mess = await sortedActivities.map((answer) => (<Messagens data={answer} id={id} />))
                //console.log('mess', mess);
                setMessages(mess.sort((a, b) => b.creationDate - a.creationDate));                

            }
          else setMessages();
        });  
    }, [answers, answer]);
    
    let message = {    
        text: "",
        questionId: id,
        likes: 0,
        creationDate: new Date()        
    }
    
    //console.log('aaaaaaaaaaaa MessagensList', data, data.id, data.answers, id, answers, message);
    
    return (
        <>
            <CardLayout classNames={{ card: "vertical-center" }}>
                <div style={{ width: '-webkit-fill-available' }}>
                    <Card arrayCards={data} noFooter={true}/>    
                    <MessagensForm message={message} questionAnswers={new Number(answers)+1}/>

                    <h5 style={{marginTop: 20}}>Respostas:</h5>
                    <Divider variant="inset" />
                    {messages}
                </div>                            
            </CardLayout>
        </>
    )
}