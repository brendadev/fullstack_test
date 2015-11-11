"use strict";
(function(){

var express = require('express'),
    http = require('http');
var app = express();

app.get('/', function(req, res){
   res.send("Hello World");
});

app.set('port', 8080);

http.createServer(app).listen(app.get('port'));

}).call(this);
