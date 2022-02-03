const express = require('express');
const router = express.Router();
const Galer = require('../controllers/galeria.controller.js');
const User = require('../controllers/users.controller.js');
const ScoutSound = require('../controllers/scout_sound.controller.js');
const Redes = require('../controllers/rede.controller.js');
const multer = require('multer');
const path = require('path');


//FOTOS
const storage = multer.diskStorage({
    destination: './public/imagens/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage

})

//GALERIA
router.get('/galeria', Galer.read);
router.get('/galeria/:id', Galer.readID);
router.post('/galeria/', Galer.save);
router.post('/galeriaCapaSound/', upload.single('sound_capa_galeria'), Galer.save_capa_galeria);
router.post('/galeriaCapaScout/', upload.single('scout_capa_galeria'), Galer.save_capa_galeria);
router.post('/galeriaAlbumSound/', upload.any('album_Sound'), Galer.save_galeria_album);
router.post('/galeriaAlbumScout/', upload.any('album_Scout'), Galer.save_galeria_album);
router.put('/galeria/:id', Galer.update);
router.delete('/galeria/:id', Galer.deleteID);

//USERS
router.get('/users', User.read);
router.get('/users/:id', User.readID);
router.post('/users/', User.save);
router.put('/users/:id', User.update);
router.delete('/users/:id', User.deleteID);


//REDES
router.get('/redes', Redes.read);
router.get('/redes/:id', Redes.readID);
router.put('/redes/:id', Redes.save);
router.put('/ScoutredesCapa', upload.single('Capa_redes_scout'), Redes.save_imagem_scout);
router.put('/SoundredesCapa', upload.single('Capa_redes_sound'), Redes.save_imagem_sound);

//SCOUT e SOUND
router.get('/scoutGet', ScoutSound.read);
router.get('/soundtGetbanner', ScoutSound.read_banner_sound);
router.get('/scout/:id', ScoutSound.readID);
router.post('/scoutRevistas/', ScoutSound.save_revistas);
router.put('/saveText/:id', ScoutSound.save_text);
router.post('/scoutCapa/', upload.single('capa'), ScoutSound.save_capa);
router.post('/soundSlide1/', upload.single('sound_slider1'), ScoutSound.save_slider_sound);
router.post('/soundSlide2/', upload.single('sound_slider2'), ScoutSound.save_slider_sound);
router.post('/soundSlide3/', upload.single('sound_slider3'), ScoutSound.save_slider_sound);
router.post('/scoutSlide1/', upload.single('scout_slider1'), ScoutSound.save_slider_scout);
router.post('/scoutSlide2/', upload.single('scout_slider2'), ScoutSound.save_slider_scout);
router.post('/scoutSlide3/', upload.single('scout_slider3'), ScoutSound.save_slider_scout);
router.post('/scoutBanner/', upload.single('banner_scout'), ScoutSound.save_banner_scout);
router.post('/soundBanner/', upload.single('banner_sound'), ScoutSound.save_banner_sound);
router.post('/scoutTexto_image/', upload.single('tximagem_scout'), ScoutSound.save_text_image_scout);
router.post('/soundTexto_image/', upload.single('tximagem_sound'), ScoutSound.save_text_image_sound);
router.post('/scoutTexto/', ScoutSound.save_text);
router.put('/scoutRevistas_mod/', ScoutSound.update);
router.delete('/scout/:id', ScoutSound.deleteID);
router.get('/banner', ScoutSound.bannerSound);

module.exports = router;



