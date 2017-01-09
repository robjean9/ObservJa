var usuario =  require('./models/usuario');
var problema = require('./models/problema');

var categoria = require('./models/categoria');

var estado = require('./models/estado');
var cidade = require('./models/cidade');

////////////
formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    uuid = require('uuid');
//////////

var auth = require('./validarJWT.js');


module.exports = {
	configure: function(app){

		app.get('/usuario/',auth.middlewareUsuario, function(req,res){
			usuario.get(res);
		});

		app.post('/usuario/login/', function(req, res){
			usuario.login(req.body, res);
		});

		app.post('/usuario/', function(req,res){
			
			
			usuario.create(req.body,res);
		});

		app.put('/usuario/', function(req, res){
			usuario.update(req.body, res);
		});

		app.delete('/usuario/:id/', function (req, res) {
			usuario.delete(req.params.id, res);
		});
		
		app.get('/problema/', function(req,res){
			problema.get(res);
		});

		app.post('/problema/', function(req,res){
			problema.create(req.body,res);
		});
		
		app.put('/problema/', function(req, res){
			problema.update(req.body, res);
		});
		
		app.delete('/problema/:id/', function (req, res) {
			problema.delete(req.params.id, res);
		});

		app.get('/categoria', function(req,res){
			categoria.get(res);
		});

		app.post('/categoria/', function(req,res){
			problema.create(req.body,res);
		});

		app.put('/categoria/', function(req, res){
			problema.update(req.body, res);
		});

		app.delete('/categoria/:id/', function (req, res) {
			problema.delete(req.params.id, res);
		});

		app.get('/estado/', function(req, res){
			estado.get(res);
		});

		app.get('/cidade/:id/', function(req,res){
			cidade.get(req.params.id, res);
		});

		app.use(qt.static(__dirname + '/'));

		app.post('/problemaFt', function(req,res){
			console.log("1");
			var form = new formidable.IncomingForm();
			var campos;
		    form.parse(req, function(err, fields, files) {
		        //res.writeHead(200, {'content-type': 'text/plain'});
		        //res.write('received upload:\n\n');
		        campos = fields;
		        res.json({'result': 'cadastrado poha!'});
		    });


			form.on('end', function(fields,files){

				
				
				var temp_path = this.openedFiles[0].path;
		      
		        var file_name = uuid.v1() + ".png";
		        var new_location = 'uploads/';
		        var midia = new_location + file_name;
		        fs.copy(temp_path, midia,  function(err) {
		            if (err) {
		                console.error(err);
		            } else {
		            	console.log(campos);
		            	problema.create(campos.titulo,campos.descricao,campos.idCategoria,midia,campos.tipo,campos.idUsuario,campos.lat,campos.lng,campos.local, res);
		            	console.log(new_location + file_name);
		                console.log("success!");
		            }
				});
			});
		});


		app.post('/esqueceuSenha', function(req,res){
			usuario.esqueceuSenha(req.body,res);
		});
	}
};