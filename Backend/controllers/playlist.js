const con = require("../config/connect");
var mysql = require('mysql');

exports.read = function (req, res) {


    con.query('SELECT * from playlist', function (err, rows, fields) {
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

exports.save = function (req, res) {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const link = req.body.link;

    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        titulo,
        texto,
        link


    ];

    query = con.query('INSERT INTO playlist SET id=?, titulo=?, texto=?, link=?', post, function (err, rows, fields) {
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


exports.save_capa = function (req, res) {

    const id = req.body.id;
    const capa_playlist = req.file.path;


    var query = "";


    // Store hash in your password DB.
    var post = [
        capa_playlist


    ];

    query = con.query('UPDATE playlist SET  capa=?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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


