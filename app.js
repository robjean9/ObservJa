/*eslint-env node */
/**
 * Created by robson on 26/04/2016.
 */

var express = require('express');
var bodyParser  = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');

var allowCors = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCors);


connection.init();

routes.configure(app);

var server = app.listen(8080, function(){
	console.log("Server listening on port " + server.address().port);
});



