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
        var f = __dirname +'/data/data.json';
        read(f, 'utf8', function(err, buffer) {
            if (err) {
                console.log(err);
                res.send({status:500,message:"failed to load file"});
            } else {
                console.log("got data");
                var out = JSON.parse(buffer);
                res.send({status:200,message:"success",data:out});
            }
        });
    });
};