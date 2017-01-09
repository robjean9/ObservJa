var connection = require('../connection');

function Problema(){

	this.get = function(res) {
		connection.acquire(function(err, con) {
			con.query('select * from TB_problema', function(err, result) {
				con.release();
				res.send(result);
			});
		});
	};

	 this.create = function(titulo, descricao, idCategoria, midia, tipo, idUsuario, lat, lng, local, res) {
	 	connection.acquire(function(err, con) {
	 		con.query('insert into TB_problema (titulo, descricao, idCategoria, midia, tipo, idUsuario, lat, lng, local) values (?,?,?,?,?,?,?,?,?)', [titulo, descricao, idCategoria, midia, tipo, idUsuario, lat, lng, local], function(err, result) {
	 			con.release();
	 			if (err) {
	 				console.log(err);
	 				res.send({status: 1, message: 'Problema creation failed', err: err});
	 			} else {
	 				res.send({status: 0, message: 'Problema created successfully'});
	 			}
	 		});
	 	});
	 };


		/*this.create = function(problema, res) {
			        connection.acquire(function(err, con) {
            con.query('insert into TB_problema set ?', problema, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'problema creation failed'});
                } else {
                    res.send({status: 0, message: 'problema created successfully'});
                }
            });
        });
	};*/

	this.update = function(problema, res) {
		connection.acquire(function(err, con) {
			con.query('update TB_problema set ? where id = ?', [problema, problema.id], function(err, result) {
				con.release();
				if (err) {
					res.send({status: 1, message: 'Problema update failed'});
				} else {
					res.send({status: 0, message: 'Problema updated successfully'});
				}
			});
		});
	};

	this.delete = function(id, res) {
		connection.acquire(function(err, con) {
			con.query('delete from TB_problema where id = ?', [id], function(err, result) {
				con.release();
				if (err) {
					res.send({status: 1, message: 'Failed to delete'});
				} else {
					res.send({status: 0, message: 'Deleted successfully'});
				}
			});
		});
	};
}

module.exports = new Problema();