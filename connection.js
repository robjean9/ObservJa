var mysql = require("mysql");

function Connection(){
	this.pool = null;

	this.init = function(){
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: 'l2rp.com.br',
			user: 'dba',
			password: 'l2rp12345mysql',
			database: 'observJa'
		});
	};

	this.acquire = function(callback){
		this.pool.getConnection(function(err, connection){
			callback(err, connection);
		});
	};
}

module.exports = new Connection();