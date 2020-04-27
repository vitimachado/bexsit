const MessageModel = require('../models/messages');

exports.saveAnswer = function(req, res) {    

    const { answer, questionAnswers } = req.body.value;
    console.log('MessageModel saveAnswer', req.body, req.body.value, answer, questionAnswers);
    let value = { 
        ...answer, 
        userId: req.userId,
        userName: req.username 
    }

    MessageModel.saveAnswer(value, questionAnswers).then(data => {
            
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.status(200).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });

};

exports.saveQuestion = function(req, res) {    

    console.log('saveQuestion', req.body.value);
    let value = { 
        ...req.body.value, 
        userId: req.userId,
        userName: req.username 
    }

    MessageModel.saveQuestion(value).then(data => {
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.status(200).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });

};

exports.voteQuestion = function(req, res) {    

    console.log('\n\n\n\niiiiiiiiiiiiiiiiiiiiiiiiiii voteQuestion', req.body);
    let value = { 
        ...req.body, 
        userId: req.userId,
        userName: req.username 
    }

    MessageModel.updateVote({...req.body}).then(data => {
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.status(200).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });

};

exports.likeAnswer = function(req, res) {    

    console.log('\n\n\n\nzzzzzzzzzzzzzzzzzzzzzzzzzz likeAnswer', req.body);
    let value = { 
        ...req.body, 
        userId: req.userId,
        userName: req.username 
    }

    MessageModel.updateLike({...req.body}).then(data => {
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.status(200).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });

};


exports.getQuestions = function(req, res) {    
    
    console.log('getQuestions', req.body.search);
    MessageModel.searchCollection('questions', null, null, (doc) => {
        console.log(doc.id)
        return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    }).then(data => {
            //res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username });
            getUserById(res.userId)
            .then(user => {
                    res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username, user: { ...user, hash: null } });                    
                }        
            ).catch(err => {
                console.log('Error', err);
                res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
            });
        }        
    ).catch(err => {
        console.log('Error', err);
        res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });
};

exports.getAnswers = function(req, res) {    
    
    let { data } = req.body;
    console.log('getAnswers', req.body.data, data);
    MessageModel.searchCollection('answers', ["questionId", "==", data], null, (doc) => {
        console.log(doc.id)
        return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    }).then(data => {
            //res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username });
            getUserById(res.userId)
            .then(user => {
                    res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username, user: { ...user, hash: null } });                    
                }        
            ).catch(err => {
                console.log('Error', err);
                res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
            });
        }        
    ).catch(err => {
        console.log('Error', err);
        res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });
};

exports.getKeywordsQuestion = function(req, res) {    
    
    let { data } = req.body;
    console.log('getKeywordsQuestion', req.body.data, data);
    MessageModel.searchCollection('questions', ['keywords', 'array-contains', data], null, (doc) => {
        console.log(doc.id)
        return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    }).then(data => {
            //res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username });
            getUserById(res.userId)
            .then(user => {
                    res.status(200).json({statusCode: "200", data, userId: res.userId, username: res.username, user: { ...user, hash: null } });                    
                }        
            ).catch(err => {
                console.log('Error', err);
                res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
            });
        }        
    ).catch(err => {
        console.log('Error', err);
        res.status(500).json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });
};


getUserById = function(id) {    
    
    console.log('getUserById', id);
    return MessageModel.searchDocument('users', id, (doc) => {
        console.log(doc.id)
        return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    });
};