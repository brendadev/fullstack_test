//server_routes/insurance.js

module.exports = function(app){
    // called from server.js
    app.get('/insurance', function(req, res){
        res.send("Hello World!");
    });
};