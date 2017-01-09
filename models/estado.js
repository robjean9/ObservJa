/**
 * Created by LucasJ on 01/11/2016.
 */
/**
 * Created by LucasJ on 01/11/2016.
 */
var connection = require('../connection');

function Estado(){

    this.get = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from estado', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
    
}

module.exports = new Estado();