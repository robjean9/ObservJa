/**
 * Created by LucasJ on 14/09/2016.
 */
var connection = require('../connection');

var jwt  = require('jwt-simple');

var moment = require('moment');

var secret = 'l2rpfuckingcryptcode';

var nodemailer = require('nodemailer');

function Usuario(){

    this.get = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from TB_usuario', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function(usuario, res) {
        connection.acquire(function(err, con) {
            con.query('insert into TB_usuario set ?', usuario, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'usuario creation failed'});
                } else {
                    res.send({status: 0, message: 'usuario created successfully'});
                }
            });
        });
    };

    this.update = function(usuario, res) {
        connection.acquire(function(err, con) {
            con.query('update TB_usuario set ? where id = ?', [usuario, usuario.id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'usuario update failed'});
                } else {
                    res.send({status: 0, message: 'usuario updated successfully'});
                }
            });
        });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('delete from TB_usuario where id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };

    this.login = function(dados, res){
    	connection.acquire(function(err,con){
    		con.query('select * from TB_usuario where email = ? and senha= ?',[dados.email, dados.senha],  function(err, result) {
    			con.release();
                if(result[0]==null){
					res.send({status: 1, message: 'Failed login'});
    			}else{
                    console.log(result[0].id)
                    var expires = moment().add(7,'days').valueOf();
                    var token = jwt.encode({
                        iss: result[0].id,
                        exp: expires
                    }, secret);

                    res.send({status: 0, message: 'usuario logged successfully', usuario:result, token: token});
					
    			}
    		});
    	});
    };

    this.esqueceuSenha = function(dados, res){

        connection.acquire(function(err,con){
            con.query('select * from TB_usuario where email = ? ',[dados.email],  function(err, result) {
                con.release();
                
                if(result[0]==null){
                    res.send({status: 1, message: 'Email não encontrado'});
                }else{
                    //enviar email

                    var smtpConfig = {
                        host: 'cpanel0132.hospedagemdesites.ws',
                        port: 465,
                        secure: true, // use SSL
                        auth: {
                            user: 'recuperar@observja.com.br',
                            pass: 'Recuperar123'
                        }
                    };

                    var transporter = nodemailer.createTransport(smtpConfig);


                    var mail = {
                        from: '"ObservJá" <recuperar@observja.com.br>',
                        to: dados.email,
                        subject: 'Recuperação de Senha',
                        text: 'Sua Senha é :' + result[0].senha,
                        html: '<b> Sua Senha é: </b> ' + result[0].senha
                    };

                    transporter.sendMail(mail, function(error, info){
                        if(error){
                            console.log(error);
                        }
                         res.send({status: 0, message: 'Senha enviada ao email'});
                    });
                }
            });
        });
    };
}

module.exports = new Usuario();