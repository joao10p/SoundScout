const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function(req, res) {


    con.query('SELECT * from users', function(err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("Galeria not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

exports.readID = function(req, res) {

    const codigo = req.params.id;


    con.query('SELECT * from users where codigo=?', [codigo], function(err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "galeria nao encontrada"
                });
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            res.status(400).send({
                "msg": err.code
            });
        console.log('Error while performing Query.', err);
    });
}


exports.save = function(req, res) {
    const codigo = req.body.codigo;
    const nome = req.body.nome;
    const email = req.body.email;
    const numero = req.body.numero;
    
    var query = "";
   

        // Store hash in your password DB.
        var post = [
            codigo,
            nome,
            email,
            numero,
            

        ];
         
        query = con.query('INSERT INTO galeria SET titulo=?, data=?, fotografo=?, imagem=?', post, function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(200).location(rows.insertId).send({
                    "msg": "inserted with success"
                });
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(409).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                }
                else res.status(400).send({ "msg": err.code });
            }
        });

}




exports.update = function(req, res) {
    const titulo =req.params.id;
    const data = req.body.data;
    const fotografo = req.body.fotografo;
    const imagem = req.body.imagem;
 
    var query = "";
    

        var update = [
            data,
            fotografo,
            imagem,
            titulo,
            
        ];
         
        query = con.query('UPDATE galeria SET data =?, fotografo=? where titulo=?', update, function(err, rows,
            fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            }
            else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);

            };
        });


}



exports.deleteID = function(req, res) {
    const titulo = req.params.id;

    con.query('DELETE from galeria where titulo= ?', [titulo], function(err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}
