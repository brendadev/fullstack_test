//server_routes/insurance.js
//will access /server_routes jade template, which connects to front-end, e.g. main.js
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
                //data.out contains the top level data, which contains array of data elements
                //need to do data:out.data to access the array within the parent data
                res.send({status:200,message:"success",data:out.data});
            }
        });
    });
};