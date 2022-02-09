const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function (req, res) {


    con.query('SELECT * from galeria_scout', function (err, rows, fields) {
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
exports.read_id = function (req, res) {
    const id = req.params.id;

    con.query('SELECT * from galeria_scout WHERE id =?', [id], function (err, rows, fields) {
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
exports.readMax = function (req, res) {

    const id = req.params.id;


    con.query('SELECT id FROM galeria_scout ORDER BY id DESC LIMIT 0, 1', [id], function (err, rows, fields) {
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


exports.readID = function (req, res) {

    const id = req.params.id;


    con.query('SELECT SUBSTRING(capa, 8) AS capa from galeria_scout WHERE id =?', [id], function (err, rows, fields) {
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
exports.readID_FOTOS = function (req, res) {
    const id = req.params.id;
    var post = [
        id,
        id,
        id,
        id,
        id,
        id,
        id,
        id,
        id


    ];


    con.query('SELECT ( SELECT SUBSTRING(foto1, 8) AS foto1 from galeria_scout WHERE id =? ) as foto1,  ( SELECT SUBSTRING(foto2, 8) AS foto2 from galeria_scout WHERE id =? )  AS foto2 , ( SELECT SUBSTRING(foto3, 8) AS foto3 from galeria_scout WHERE id =? )  AS foto3,( SELECT SUBSTRING(foto4, 8) AS foto4 from galeria_scout WHERE id =? )  AS foto4,( SELECT SUBSTRING(foto5, 8) AS foto5 from galeria_scout WHERE id =? )  AS foto5,( SELECT SUBSTRING(foto6, 8) AS foto6 from galeria_scout WHERE id =? )  AS foto6,( SELECT SUBSTRING(foto7, 8) AS foto7 from galeria_scout WHERE id =? )  AS foto7,( SELECT SUBSTRING(foto8, 8) AS foto8 from galeria_scout WHERE id =? )  AS foto8,( SELECT SUBSTRING(foto9, 8) AS foto9 from galeria_scout WHERE id =? )  AS foto9', post, function (err, rows, fields) {
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


exports.save = function (req, res) {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const revista = req.body.revista;
    const data = req.body.data;
    const fotografo = req.body.fotografo;


    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        titulo,
        revista,
        data,
        fotografo


    ];

    query = con.query('INSERT INTO galeria_scout SET id=?, titulo=?, revista=?, data=?, fotografo=?', post, function (err, rows, fields) {
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
exports.save_capa_galeria = function (req, res) {

    const capa = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        capa


    ];

    query = con.query('UPDATE galeria_scout SET  capa =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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
exports.update = function (req, res) {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const revista = req.body.revista;
    const data = req.body.data;
    const fotografo = req.body.fotografo;

    var query = "";


    var update = [
        titulo,
        revista,
        data,
        fotografo,
        id


    ];

    query = con.query('UPDATE galeria_scout SET titulo=?,revista=?,data=?,fotografo=? where id=?', update, function (err, rows,
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



exports.deleteID = function (req, res) {
    const id = req.params.id;

    con.query('DELETE from galeria_scout where id= ?', [id], function (err, rows, fields) {
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
