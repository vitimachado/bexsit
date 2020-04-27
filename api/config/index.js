var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');
const authMiddleware = require("../middlewares/auth");

module.exports = function(){
  var app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(authMiddleware);

  consign()
   .include('controllers')
   .then('routes')
   .then('models')
   .into(app);

  return app;
}