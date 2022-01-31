const con = require("../config/connect");
var mysql = require('mysql');

//var connection = mysql.createConnection();  


exports.read = function (req, res) {


    con.query('SELECT * from revistas', function (err, rows, fields) {
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


exports.read_banner_sound = function (req, res) {
    const id = 24;

    con.query('SELECT banner from revistas WHERE id =?', [id], function (err, rows, fields) {
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


    con.query('SELECT * from revistas where id=?', [id], function (err, rows, fields) {
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


exports.save_revistas = function (req, res) {
    const id = req.body.id;
    const nome = req.body.nome;
    const edicao = req.body.edicao;
    const nome_revista = req.body.nome_revista;
    const revista = req.body.revista;
    const capa = req.file.filename;

    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        nome,
        edicao,
        nome_revista,
        revista,
        capa


    ];

    query = con.query('INSERT INTO revistas SET id=?, nome=?,edicao=?, nome_revista=?, revista=?, capa=?', post, function (err, rows, fields) {
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

//slider 1 

exports.save_slider1 = function (req, res) {
    const id = req.body.id;
    const nome_revista = req.body.nome_revista;
    const slider1 = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        nome_revista,
        slider1

    ];

    query = con.query('INSERT INTO revistas SET id=?, nome_revista =?, slider1 =?', post, function (err, rows, fields) {
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

exports.save_slider2 = function (req, res) {
    const id = req.body.id;
    const nome_revista = req.body.nome_revista;
    const slider2 = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        nome_revista,
        slider2

    ];

    query = con.query('INSERT INTO revistas SET id=?, nome_revista =?, slider2 =?', post, function (err, rows, fields) {
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

exports.save_slider3 = function (req, res) {
    const id = req.body.id;
    const nome_revista = req.body.nome_revista;
    const slider3 = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        id,
        nome_revista,
        slider3

    ];

    query = con.query('INSERT INTO revistas SET id=?, nome_revista =?, slider3 =?', post, function (err, rows, fields) {
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
exports.save_banner_sound = function (req, res) {
    const id = 24;
    const nome_revista = 1;
    const banner_sound = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [
        nome_revista,
        banner_sound,
        id

    ];

    query = con.query('UPDATE revistas SET nome_revista=?, banner =? WHERE id=?', post, function (err, rows, fields) {
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

exports.save_banner_scout = function (req, res) {
    const id = 23;
    const nome_revista = 2;
    const banner_scout = req.file.filename;
    var query = "";


    // Store hash in your password DB.
    var post = [

        nome_revista,
        banner_scout,
        id

    ];

    query = con.query('UPDATE revistas SET nome_revista=?, banner =? WHERE id=?', post, function (err, rows, fields) {
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


exports.save_text = function (req, res) {
    const id = 1;
    const nome_revista = req.body.nome_revista;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const cargoS = req.body.cargoS;
    const nome_cria_txt = req.body.nome_cria_txt;
    var query = "";


    // Store hash in your password DB.
    var post = [
        nome_revista,
        titulo,
        texto,
        cargoS,
        nome_cria_txt,
        id
        


    ];

    query = con.query('UPDATE revistas SET nome_revista=?, titulo =?, texto =?, cargoS =?, nome_cria_txt =? WHERE id=? ', post, function (err, rows, fields) {
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

exports.save_text_image_sound = function (req, res) {
    const id = 1;
    const tximagem = req.file.filename;
    
    var query = "";


    // Store hash in your password DB.
    var post = [
        tximagem,
        id


    ];

    query = con.query('UPDATE revistas SET tximagem =? WHERE id=? ', post, function (err, rows, fields) {
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
exports.save_text_image_scout = function (req, res) {
    const id = 2;
    const tximagem = req.file.filename;
    
    var query = "";


    // Store hash in your password DB.
    var post = [
        tximagem,
        id


    ];

    query = con.query('UPDATE revistas SET tximagem =? WHERE id=? ', post, function (err, rows, fields) {
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
    const nome = req.body.nome;
    const edicao = req.body.edicao;
    const nome_revista = req.body.nome_revista;
    const revista = req.body.revista;
    const capa = req.body.capa;
    const banner = req.body.banner;
    const slider1 = req.body.slider1;
    const slider2 = req.body.slider2;
    const slider3 = req.body.slider3;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const tximagem = req.body.tximagem;
    const cargoS = req.body.cargoS;
    const nome_cria_txt = req.body.nome_cria_txt;

    var query = "";


    var update = [
        nome,
        edicao,
        nome_revista,
        revista,
        capa,
        banner,
        slider1,
        slider2,
        slider3,
        titulo,
        texto,
        tximagem,
        cargoS,
        nome_cria_txt,
        id

    ];

    query = con.query('UPDATE revistas SET nome=?,edicao=?, nome_revista=?, revista=?, capa=?,banner=?,slider1 =?,slider2 =?, slider3 =?, titulo =?, texto=?, tximagem=?,cargoS=?,nome_cria_txt=? where id=?', update, function (err, rows,
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

    con.query('DELETE from revistas where id= ?', [id], function (err, rows, fields) {
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
exports.bannerSound = function (req, res) {


    con.query('Select banner From revistas Where nome_revista="1" and banner is not null', function (err, rows, fields) {
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