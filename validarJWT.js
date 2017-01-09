
var usuario = 	require('./models/usuario.js');

var connection = require('./connection.js');

var jwt  = require('jwt-simple');

var moment = require('moment');

var secret = 'l2rpfuckingcryptcode';

exports.middlewareUsuario = function(req, res, next){
	var token = (req.body && req.body.Authorization) || (req.query && req.query.Authorization) || req.headers['authorization'];

	if(token){
		try{
			var decoded = jwt.decode(token, secret);
			
			connection.acquire(function(err,con){
				con.query('select * from TB_usuario where id =?',[decoded.iss],function(err, result){
					con.release();
					console.log(err);
					if(result[0]==null)
						res.status(500).json({message: 'erro ao procurar usuario do token'});
					req.usuario = result;
					next();
				})
			})

		}catch( error){
			console.log(error);
			return res.status(401).json({message: 'erro: token invalido', error: error});
		}
	} else {
		res.json(401, {message: 'token não informado'});
	}
}