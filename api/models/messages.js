const db = require('../config/firebase.js');
const DaoModel = require('../models/dao');

exports.saveAnswer = (message, questionAnswers) => {   
         
    console.log('exports.saveAnswer = (message, questionAnswers)', message, questionAnswers);

    return db.collection('answers').add(message)
    .then((cardDoc) => {    
        console.log('eeeeeeee exports.saveAnswer.', message, message.questionId, questionAnswers);
        return DaoModel.updateDocument('questions', message.questionId, { answers: questionAnswers })
        .then((cardDoc) => {    
            console.log('SAVED documents.', cardDoc);
            return cardDoc;    
        })
        .catch((error) => { return error; console.error("Error adding document cards: ", error); });
           
    })
    .catch((error) => { return error; console.error("Error adding document cards: ", error); });

}


exports.saveQuestion = (message) => {   
    
    message.keywords = message.text.split(' ');
    
    return db.collection('questions').add(message)
    .then((cardDoc) => {    
        console.log('SAVED documents.', cardDoc);
        return cardDoc;    
    })
    .catch((error) => { return error; console.error("Error adding document cards: ", error); });

}

exports.updateVote = ({data}) => {   
         
    console.log('exports.updateVote = (message, questionAnswers)', data);

    return DaoModel.searchDocument('questions', data.id, (document) => document)
    .then((cardDoc) => { 
        console.log('eeeeeeee updateVote exports.cardDoc  !!!!!!!.', cardDoc); 
    
        return DaoModel.updateDocument('questions', data.id, { votes: data.votes })
        .then((cardDoc) => {    
            console.log('eeeeeeee exports.saveAnswer.', data, data.id);
            let votes = data.user.votes ? data.user.votes : [];
            
            return DaoModel.updateDocument('users', data.user.userId, { votes })
            .then((cardDoc) => {    
                console.log('SAVED documents.', cardDoc);
                return cardDoc;    
            })
            .catch((error) => { console.error("updateVote Error adding document cards 1: ", error); return error;  });
               
        })
        .catch((error) => { console.error("updateVote Error adding document cards 2: ", error); return error; }); 
    })
    .catch((error) => { console.error("updateVote Error adding document cards 2: ", error); return error; }); 
}



exports.updateLike = ({data}) => {   
         
    console.log('exports.updateLike = (message, questionAnswers)', data, data);
    //return new Promise(resolve, reject => reject() );
    
    
    return DaoModel.searchDocument('answers', data.id, (document) => document)
    .then((cardDoc) => { 
        console.log('eeeeeeee exports.cardDoc  !!!!!!!.', cardDoc); 
    
        return DaoModel.updateDocument('answers', data.id, { likes: data.likes })
        .then((cardDoc) => {    
            console.log('eeeeeeee exports.saveAnswer.', data, data.questionId);
            let likes = data.user.likes ? data.user.likes : [];
            //let likes = [];
            return DaoModel.updateDocument('users', data.user.userId, { likes })
            .then((cardDoc) => {    
                console.log('SAVED documents.', cardDoc);
                return cardDoc;    
            })
            .catch((error) => { console.error("updateLike Error adding document cards 1: ", error); return error;  });
               
        })
        .catch((error) => { console.error("updateLike Error adding document cards 2: ", error); return error; }); 
    })
    .catch((error) => { console.error("updateLike Error adding document cards 2: ", error); return error; }); 
}

exports.searchCollection = (collection, where, where2, fun) => {  

    return DaoModel.searchCollection(collection, where, where2, fun);
}

exports.searchDocument = (collection, document, fun) => {  

    return DaoModel.searchDocument(collection, document, fun);
}

