var express = require('express');
var router = express.Router();

router.get('/scout', (req, res) => {
    res.sendFile(__dirname + '/views/scout.html')
})
module.exports= router;