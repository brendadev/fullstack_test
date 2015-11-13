//server_routes/insurance.js
//will access /server_routes jade template, which connect to front-end, e.g. main.js
module.exports = function(app){
    // called from server.js
    var read = require('read-file');

    app.get('/insurance', function(req, res){
        res.render('insurance');
    });

    app.get('/data/insurance',function(req,res){
        //read('/assets/data/data.json', 'utf8', function(err, buffer) {
        read('data.json', 'utf8', function(err, buffer) {
            if (err) {
                console.log(err);
            } else {
                console.log("got data");
            }
        });
    });
};