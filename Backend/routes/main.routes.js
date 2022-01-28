const express = require('express');
const router = express.Router();
const Galer = require('../controllers/galeria.controller.js');
const User = require('../controllers/users.controller.js');
const ScoutSound = require('../controllers/scout_sound.controller.js');
//const Sound = require('../controllers/sound.controller.js');
const multer = require('multer');
const path = require('path');


//FOTOS
const storage = multer.diskStorage({
    destination: './public/imagens/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

//GALERIA
router.get('/galeria', Galer.read);
router.get('/galeria/:id', Galer.readID);
router.post('/galeria/', Galer.save);
router.put('/galeria/:id', Galer.update);
router.delete('/galeria/:id', Galer.deleteID);

//USERS
router.get('/users', User.read);
router.get('/users/:id', User.readID);
router.post('/users/', User.save);
router.put('/users/:id', User.update);
router.delete('/users/:id', User.deleteID);

//SCOUT e SOUND
router.get('/scoutGet', ScoutSound.read);
router.get('/scout/:id', ScoutSound.readID);
router.post('/scoutRevistas/', upload.single('capa'), ScoutSound.save_revistas);
router.post('/scoutSlide1/', upload.single('slider1'), ScoutSound.save_slider1);
router.post('/scoutSlide2/', upload.single('slider2'), ScoutSound.save_slider2);
router.post('/scoutSlide3/', upload.single('slider3'), ScoutSound.save_slider3);
router.post('/scoutBanner/', upload.single('banner_scout'), ScoutSound.save_banner_scout);
router.post('/soundBanner/', upload.single('banner_sound'), ScoutSound.save_banner_sound);
router.post('/scoutTexto/', upload.single('tximagem'), ScoutSound.save_text);
router.put('/scout/:id', ScoutSound.update);
router.delete('/scout/:id', ScoutSound.deleteID);
router.get('/banner', ScoutSound.bannerSound);

//SOUND
/*router.get('/sound', Sound.read);
router.get('/sound/:id', Sound.readID);
router.post('/sound/', Sound.save);
router.put('/sound/:id', Sound.update);
router.delete('/sound/:id', Sound.deleteID);
*/
module.exports = router;
console.log('Passou as rotas');


