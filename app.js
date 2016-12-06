var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var config = require('./config');
var mongoose = require('mongoose');
var app = express();
mongoose.connect(config.database, {auth:{authdb:"admin"}}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('connection successful');
    }
})
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({limit: '50MB', extended: true}));
app.use(morgan('dev'));

var router = require('./router')(express, app);
app.listen(config.port, function(){
	console.log("Running on port using gulp: " + config.port);
});