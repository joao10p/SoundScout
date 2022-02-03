const con = require("../config/connect");
var mysql = require('mysql');




exports.read = function (req, res) {


    con.query('SELECT * from redes', function (err, rows, fields) {
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


exports.readID = function (req, res) {

    const id = req.params.id;


    con.query('SELECT * from redes where id=?', [id], function (err, rows, fields) {
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



exports.save_imagem_sound = function (req, res) {
    const id = 1;
    const imagem = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        imagem,
        id


    ];

    query = con.query('UPDATE redes SET  imagem=?  where id =?', post, function (err, rows, fields) {
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

exports.save_imagem_scout = function (req, res) {
    const id = 2;
    const imagem = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        imagem,
        id


    ];

    query = con.query('UPDATE redes SET  imagem=?  where id =?', post, function (err, rows, fields) {
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

exports.save = function (req, res) {
    const id = req.params.id;
    const nome_revista = req.body.nome_revista;
    const link = req.body.link;
    var query = "";


    // Store hash in your password DB.
    var post = [
        nome_revista,
        link,
        id

    ];

    query = con.query('UPDATE redes SET nome_revista =?, link =? WHERE id =?', post, function (err, rows, fields) {
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
