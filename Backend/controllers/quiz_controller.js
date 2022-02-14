const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function(req, res) {


    con.query('SELECT * from quiz', function(err, rows, fields) {
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

exports.readID = function(req, res) {

    const id = req.params.id;


    con.query('SELECT * from quiz where id=?', [id], function(err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "user nao encontrado"
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
    const pergunta = req.body.pergunta;
    const resposta1 = req.body.resposta1;
    const resposta2 = req.body.resposta2;
    const resposta3 =req.body.resposta3;
    const resposta4 = req.body.resposta4;   
    const certa = req.body.certa;   
    var query = "";
   

        // Store hash in your password DB.
        var post = [
            id,
            pergunta,
            resposta1,
            resposta2,
            resposta3,
            resposta4,
            certa


        ];
         
        query = con.query('INSERT INTO quiz SET id=?, pergunta=?, resposta1=?, resposta2=?,resposta3=?,resposta4 =?, certa=?', post, function(err, rows, fields) {
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
    const id = req.body.id;
    const pergunta = req.body.pergunta;
    const resposta1 = req.body.resposta1;
    const resposta2 = req.body.resposta2;
    const resposta3 =req.body.resposta3;
    const resposta4 = req.body.resposta4;   
    const certa = req.body.certa; 
 
    var query = "";
    

        var update = [
            pergunta,
            resposta1,
            resposta2,
            resposta3,
            resposta4,
            certa,
            id
            
        ];
         
        query = con.query('UPDATE users SET pergunta=?, resposta1=?, resposta2=?,resposta3=?,resposta4 =?, certa=? where id=?', update, function(err, rows,
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

    con.query('DELETE from users where id= ?', [id], function(err, rows, fields) {
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