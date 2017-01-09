var connection = require('../connection');

function Categoria() {

	this.get = function(res) {
		connection.acquire(function(err, con) {
			con.query('select * from TB_categoria', function(err, result) {
				con.release();
				res.send(result);
			});
		});
	};

	this.create = function(categoria, res) {
		connection.acquire(function(err, con) {
			con.query('insert into TB_categoria set ?', categoria, function(err, result) {
				con.release();
				if (err) {
					res.send({status: 1, message: 'Categoria creation failed'});
				} else {
					res.send({status: 0, message: 'Categoria created successfully'});
				}
			});
		});
	};

	this.update = function(categoria, res) {
		connection.acquire(function(err, con) {
			con.query('update TB_categoria set ? where id = ?', [categoria, categoria.id], function(err, result) {
				con.release();
				if (err) {
					res.send({status: 1, message: 'Categoria update failed'});
				} else {
					res.send({status: 0, message: 'Categoria updated successfully'});
				}
			});
		});
	};

	this.delete = function(id, res) {
		connection.acquire(function(err, con) {
			con.query('delete from TB_categoria where id = ?', [id], function(err, result) {
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

module.exports = new Categoria();