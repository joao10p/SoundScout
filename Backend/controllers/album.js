const con = require("../config/connect");
var mysql = require('mysql');



exports.save1 = function (req, res) {
    const id = req.body.id;
    const foto1 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        foto1,

    ];

    query = con.query('INSERT INTO album SET id=?, foto1=?', post, function (err, rows, fields) {
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
exports.save2 = function (req, res) {
    const id = req.body.id;
    const foto2 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto2



    ];

    query = con.query('UPDATE album SET  foto2 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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
exports.save3 = function (req, res) {
    const id = req.body.id;
    const foto3 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto3



    ];

    query = con.query('UPDATE album SET  foto3 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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
exports.save4 = function (req, res) {
    const id = req.body.id;
    const foto4 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto4



    ];

    query = con.query('UPDATE album SET  foto4 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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


exports.save5 = function (req, res) {
    const id = req.body.id;
    const foto5 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto5



    ];

    query = con.query('UPDATE album SET  foto5 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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

exports.save6 = function (req, res) {
    const id = req.body.id;
    const foto6 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto6



    ];

    query = con.query('UPDATE album SET  foto6 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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
exports.save7 = function (req, res) {
    const id = req.body.id;
    const foto7 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto7



    ];

    query = con.query('UPDATE album SET  foto7 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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
exports.save8 = function (req, res) {
    const id = req.body.id;
    const foto8 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto8



    ];

    query = con.query('UPDATE album SET  foto8 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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

exports.save9 = function (req, res) {
    const id = req.body.id;
    const foto9 = req.file.path;
    var query = "";


    // Store hash in your password DB.
    var post = [
        foto9



    ];

    query = con.query('UPDATE album SET  foto9 =?  where id >=1 ORDER BY id DESC LIMIT 1', post, function (err, rows, fields) {
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