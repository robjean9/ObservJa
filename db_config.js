/**
 * Created by LucasJ on 26/04/2016.
 */
// var db_string = 'mongodb://chupingole:chupingole@ds011800.mlab.com:11800/chupingole';
var db_string = 'mongodb://127.0.0.1/uniRide';

var mysql = require('mysql');

exports.Schema = mongoose.Schema;

var db = mongoose.connection;
