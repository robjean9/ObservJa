/**
 * Created by LucasJ on 01/11/2016.
 */
var connection = require('../connection');

function Cidade(){

    this.get = function(estado,res) {
        connection.acquire(function(err, con) {
            con.query('select * from cidade where estado = ?',[estado], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
    
}

module.exports = new Cidade();