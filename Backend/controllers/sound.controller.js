const con = require("../config/connect");
var mysql = require('mysql');
//var connection = mysql.createConnection();  


exports.read = function(req, res) {


    con.query('SELECT * from sound', function(err, rows, fields) {
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


    con.query('SELECT * from sound where id=?', [id], function(err, rows, fields) {
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
    const edicao = req.body.edicao;
    const revista = req.body.revista;
    const capa = req.body.capa;
    const banner =req.body.banner;
    const slider1 = req.body.slider1;   
    const slider2 = req.body.slider2;
    const slider3 = req.body.slider3;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const txtimagem = req.body.txtimagem;
    const cargoS = req.body.cargoS;
    
    var query = "";
   

        // Store hash in your password DB.
        var post = [
            id,
            edicao,
            revista,
            capa,
            banner,
            slider1,
            slider2,
            slider3, 
            titulo,
            texto,
            txtimagem,
            cargoS

        ];
         
        query = con.query('INSERT INTO sound SET id=?, edicao=?, revista=?, capa=?,banner=?,slider1 =?,slider2 =?, slider3 =?, titulo =?, texto=?, txtimagem=?,cargoS=?', post, function(err, rows, fields) {
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
    const edicao = req.body.edicao;
    const revista = req.body.revista;
    const capa = req.body.capa;
    const banner =req.body.banner;
    const slider1 = req.body.slider1;   
    const slider2 = req.body.slider2;
    const slider3 = req.body.slider3;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const txtimagem = req.body.txtimagem;
    const cargoS = req.body.cargoS;
    
    var query = "";
    

        var update = [
            edicao,
            revista,
            capa,
            banner,
            slider1,
            slider2,
            slider3, 
            titulo,
            texto,
            txtimagem,
            cargoS,
            id
            
        ];
         
        query = con.query('UPDATE sound SET edicao=?, revista=?, capa=?,banner=?,slider1 =?,slider2 =?, slider3 =?, titulo =?, texto=?, txtimagem=?,cargoS=? where id=?', update, function(err, rows,
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

    con.query('DELETE from sound where id= ?', [id], function(err, rows, fields) {
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
