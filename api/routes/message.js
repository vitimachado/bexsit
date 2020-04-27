const MessageController = require('../controllers/messages');

module.exports = (app) => {

    app.post('/saveAnswer', MessageController.saveAnswer);

    app.post('/saveQuestion', MessageController.saveQuestion);

    app.post('/getQuestions', MessageController.getQuestions);

    app.post('/getAnswers', MessageController.getAnswers);

    app.post('/getKeywordsQuestion', MessageController.getKeywordsQuestion);

    app.post('/likeAnswer', MessageController.likeAnswer);    

    app.post('/voteQuestion', MessageController.voteQuestion);    
    
  };