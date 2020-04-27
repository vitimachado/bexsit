import React, { useEffect, useState } from 'react';
import './card.css';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { refreshHome, voteQuestion } from '../../store/actions';

export const Vote = ({votesObj}) => {

    const [votes, setVotes] = useState(votesObj.votes);
    const [vote, setVote] = useState("votesObj.vote");
    const user = useSelector(state => state.users.user);
    //console.log('arrayCards', votesObj);

    useEffect(() => {
        let ups = user && user.votes && user.votes.ups ? user.votes.ups : [];
        let downs =  user && user.votes && user.votes.downs ? user.votes.downs : [];

        if(ups && ups.includes(votesObj.id)) setVote('up');
        else if(downs && downs && downs.includes(votesObj.id)) setVote('down');
        setVotes(votesObj.votes);

        //console.log('uuuuuuuuuuuuuuuuuuuuuuuu answersData', votesObj, user);
    }, [votesObj, user])

    let changeVote = (e, voteNew) => {
        //console.log(e.type, voteNew, user);
        //console.log(votesObj, votesObj.id);
        //console.log(votesObj.votes);
        let { ups, downs } = user.votes;        
        
        if(voteNew == 'up') {
            votesObj.votes = votesObj.votes+1;
            if(vote === 'down') {
                votesObj.votes = votesObj.votes+1;
                downs =  downs.filter(e => e !== votesObj.id);
            }
            ups = [ ...ups, votesObj.id ];
        }
        else {
            votesObj.votes = votesObj.votes-1;
            if(vote === 'up') {
                votesObj.votes = votesObj.votes-1;
                ups = ups.filter(e => e !== votesObj.id);
            }
            downs = [ ...downs, votesObj.id ];
        }
  
        user.votes = {ups, downs};

        voteQuestion({ ...votesObj, user }).then(async (res) => 
        { 
            //console.log('handleLikeAnswer user', res);
            if(res && res.data && !res.error ) {        
                refreshHome({ votesObj: votesObj.id, userId: votesObj.userId });
            }
        });
    }

    return (
        <div className="textAlignCenter">
            <Button style={{minWidth: 0}} className={vote === 'up' ? "vote-selected green-vote" : ""}
                                            onMouseUp={(e) => changeVote(e, 'up')}>
                <Tooltip title="Vote +" aria-label="Vote +"><KeyboardArrowUpIcon /></Tooltip>
            </Button>
            <strong>{votes}</strong>
            <Button style={{minWidth: 0}} className={vote === 'down' ? "vote-selected red-vote" : ""}
                                            onMouseUp={(e) => changeVote(e, 'down')}>
                <Tooltip title="Vote -" aria-label="Vote -"><KeyboardArrowDownIcon /></Tooltip>
            </Button>
        </div>
    )
}