const con = require("../config/connect");
var mysql = require('mysql');


exports.save = function (req, res) {
    const id = req.body.id;
    const nome = req.body.nome;
    const edicao = req.body.edicao;
    const link = req.body.link;
    const revista = "scout";
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        nome,
        edicao,
        link,
        revista


    ];

    query = con.query('INSERT INTO revista_scout SET id=?, nome=?, edicao=?, link=?, revista =?', post, function (err, rows, fields) {
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
exports.readMax = function (req, res) {

    const id = req.params.id;


    con.query('SELECT id FROM revista_scout ORDER BY id DESC LIMIT 0, 1', [id], function (err, rows, fields) {
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
exports.read_id = function (req, res) {
    const id = req.params.id;

    con.query('SELECT * from revista_scout WHERE id =?', [id], function (err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("User not found");
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


    con.query('SELECT SUBSTRING(capa, 8) AS capa from revista_scout WHERE id =?', [id], function (err, rows, fields) {
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

exports.save_capa = function (req, res) {

    const capa = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        capa

    ];

    query = con.query('UPDATE revista_scout SET  capa =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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

exports.read_edicao = function (req, res) {
    con.query('SELECT id FROM revista_scout WHERE edicao = ( SELECT max(edicao) FROM revista_scout)', function (err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("User not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}


exports.read_capa = function (req, res) {
    const id = req.params.id;

    con.query('SELECT SUBSTRING(capa, 8) AS capa from revista_scout WHERE id =?', [id], function (err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("User not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}
exports.read_edicao2 = function (req, res) {
    con.query('SELECT MAX(edicao) from revista_scout', function (err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("User not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}