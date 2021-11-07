const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function(req, res) {


    con.query('SELECT * from galeria', function(err, rows, fields) {
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

    const id = req.params.id;


    con.query('SELECT * from galeria where id=?', [id], function(err, rows, fields) {
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
    const id = req.body.id;
    const titulo = req.body.titulo;
    const revista =req.body.revista;
    const data = req.body.data;
    const fotografo = req.body.fotografo;
    const capa = req.body.capa;
    const album =req.body.album;
    
    var query = "";
   

        // Store hash in your password DB.
        var post = [
            id,
            titulo,
            revista,
            data,
            fotografo,
            capa,
            album
            

        ];
         
        query = con.query('INSERT INTO galeria SET id=?, titulo=?, revista=?, data=?, fotografo=?, capa=?, album=?', post, function(err, rows, fields) {
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
    const id = req.params.id;
    const titulo = req.body.titulo;
    const revista =req.body.revista;
    const data = req.body.data;
    const fotografo = req.body.fotografo;
    const capa = req.body.capa;
    const album =req.body.album;
    var query = "";
    

        var update = [
            titulo,
            revista,
            data,
            fotografo,
            capa,
            album,
            id
            
            
        ];
         
        query = con.query('UPDATE galeria SET titulo=?,revista=?,data=?,fotografo=?,capa=?,album=? where id=?', update, function(err, rows,
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
    const id = req.params.id;

    con.query('DELETE from galeria where id= ?', [id], function(err, rows, fields) {
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
