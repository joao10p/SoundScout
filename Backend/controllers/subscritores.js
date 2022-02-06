const con = require("../config/connect");
var mysql = require('mysql');


exports.save = function (req, res) {
    const id = req.body.id;
    const email = req.body.email;

    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        email


    ];

    query = con.query('INSERT INTO subscritores SET id=?, email=?', post, function (err, rows, fields) {
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

exports.read = function (req, res) {


    con.query('SELECT * from subscritores', function (err, rows, fields) {
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
