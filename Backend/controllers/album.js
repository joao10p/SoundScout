const con = require("../config/connect");
var mysql = require('mysql');



exports.save = function (req, res) {
    const id = req.body.id;
    const foto1 = req.file.filename;
    const foto2 = req.file.filename;
    const foto3 = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        foto1,
        foto2,
        foto3


    ];

    query = con.query('INSERT INTO album SET id=?, foto1=?, foto2=?, foto3=?', post, function (err, rows, fields) {
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