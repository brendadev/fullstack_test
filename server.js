"use strict";
(function(){
    var express = require('express'),
       http = require('http');
    var app = express();

    app.get('/', function(req, res){
        res.redirect(303,'/insurance');
    });

    app.set('views',__dirname + '/views');
    app.set('view engine', 'jade');
    app.set('port', 8080);
    http.createServer(app).listen(app.get('port'));

}).call(this);
