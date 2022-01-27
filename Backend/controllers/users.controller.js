
/*const con = require("../config/connect");
exports.read = function(req, res) {

//para de falhar por favor

    con.query('SELECT * from Users', function(err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send("Data nao encontrada");
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

    const user = req.params.id;

    con.query('SELECT * from Users where id_user=?', user, function(err, rows, fields) {
        if (!err) {

            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(400).send({
                "msg": err.code
            });
            console.log('Error while performing Query.', err);
        }
    });
}

//ver a parte da password!
exports.save = function(req, res) {
    const user = req.body.id_user;
    const pass = req.body.password;
    bcrypt.hash(password, saltRounds).then(function (hash){
    var query = "";
    var post = {
        user,
        pass
    };
    
    console.log("with hash:" + hash);
    query = con.query('INSERT INTO Users SET id_user=? password=?', post, function(err, rows, fields) {
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
    });
}


exports.update = function(req, res) {
    const user = req.params.id;
    const pass = req.body.password;
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
    var update = {
        pass,
        user
    };
    console.log("with hash:" + hash);
    query = con.query('UPDATE Users SET password=? where id_user=?', update, function(err, rows, fields) {
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
});
}

exports.deleteID = function(req, res) {
    const user = req.params.id;
    con.query('DELETE from Users where id_user= ?', user, function(err, rows, fields) {
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
*/
const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function(req, res) {


    con.query('SELECT * from users', function(err, rows, fields) {
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


    con.query('SELECT * from users where id=?', [id], function(err, rows, fields) {
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
    const nome = req.body.nome;
    const email = req.body.email;
    const numero = req.body.numero;
    const password =req.body.password;
    const cargo = req.body.cargo;   
    var query = "";
   

        // Store hash in your password DB.
        var post = [
            id,
            nome,
            email,
            numero,
            password,
            cargo

        ];
         
        query = con.query('INSERT INTO users SET id=?, nome=?, email=?, numero=?,password=?,cargo =?', post, function(err, rows, fields) {
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
    const id =req.params.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const numero = req.body.numero;
    const password =req.body.password;
    const cargo = req.body.cargo;
 
    var query = "";
    

        var update = [
            nome,
            email,
            numero,
            password,
            cargo,
            id
            
        ];
         
        query = con.query('UPDATE users SET nome=?, email=?, numero=?,password=?,cargo =? where id=?', update, function(err, rows,
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
