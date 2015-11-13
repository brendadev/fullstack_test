"use strict";
(function(){
    var express = require('express'),
       http = require('http');
    var app = express();

    app.set('views',__dirname + '/views');
    app.set('view engine', 'jade');
    app.set('port', 8080);

    // defining access to router
    var insurance = require('./server_routes/insurance.js')(app);
    // re-routing to /insurance server router file
    app.get('/', function(req, res){
        //res.send("Hello World!");
        res.redirect(303,'/insurance')
    });

    http.createServer(app).listen(app.get('port'));

}).call(this);
