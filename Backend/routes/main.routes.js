const express = require('express');
const router = express.Router();
const Galer = require('../controllers/galeria.controller.js');
const GalerSound = require('../controllers/galeria_sound.js');
const User = require('../controllers/users.controller.js');
const ScoutSound = require('../controllers/scout_sound.controller.js');
const Redes = require('../controllers/rede.controller.js');
const Album = require('../controllers/album.js');
const AlbumSound = require('../controllers/album_sound.js');
const Subs = require('../controllers/subscritores.js');
const Play = require('../controllers/playlist.js');
const Musica = require('../controllers/musica.js');
const multer = require('multer');
const path = require('path');
var count = 1;

//FOTOS
const storage = multer.diskStorage({
    destination: './public/imagens/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${file.originalname}`)
    }
})
count++;

const upload = multer({
    storage: storage

})


//ALBUM
const storage2 = multer.diskStorage({
    destination: './public/imagens/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})
const upload2 = multer({
    storage: storage2

})





//MUSICA
router.post('/musica/', Musica.save);
router.get('/getMusica/', Musica.read);
router.post('/MusicaCapa/', upload.single("capa_musica"), Musica.save_capa);
//SUBSCRITORES
router.post('/subs/', Subs.save);
router.get('/email/', Subs.read);
//PLAYLIST
router.post('/playlist/', Play.save);
router.get('/getPlay/', Play.read);
router.post('/playlistCapa/', upload.single("capa_playlist"), Play.save_capa);

//GALERIA--ALBUM--SCOUT 
router.get('/galeriaScout', Galer.read);
router.get('/galeria/:id', Galer.readID);
router.post('/galeria/', Galer.save);
router.post('/galeriaCapaScout/', upload2.single('scout_capa_galeria'), Galer.save_capa_galeria);
router.put('/galeria/:id', Galer.update);
router.delete('/galeria/:id', Galer.deleteID);
router.post('/AlbumScout/foto1', upload2.single('1'), Album.save1);
router.post('/AlbumScout/foto2', upload2.single('2'), Album.save2);
router.post('/AlbumScout/foto3', upload2.single('3'), Album.save3);
router.post('/AlbumScout/foto4', upload2.single('4'), Album.save4);
router.post('/AlbumScout/foto5', upload2.single('5'), Album.save5);
router.post('/AlbumScout/foto6', upload2.single('6'), Album.save6);
router.post('/AlbumScout/foto7', upload2.single('7'), Album.save7);
router.post('/AlbumScout/foto8', upload2.single('8'), Album.save8);
router.post('/AlbumScout/foto9', upload2.single('9'), Album.save9);

//GALERIA--ALBUM--SOUND
router.get('/galeriaSound', GalerSound.read);
router.get('/galeriaSoundMax', GalerSound.readMax);
router.get('/galeriaSound/:id', GalerSound.readID);
router.post('/galeriaSound/', GalerSound.save);
router.post('/galeriaCapaSound/', upload2.single('sound_capa_galeria'), GalerSound.save_capa_galeria);
router.put('/galeriaSound/:id', GalerSound.update);
router.delete('/galeriaSound/:id', GalerSound.deleteID);
router.post('/AlbumSound/foto1', upload2.single('1'), AlbumSound.save1);
router.post('/AlbumSound/foto2', upload2.single('2'), AlbumSound.save2);
router.post('/AlbumSound/foto3', upload2.single('3'), AlbumSound.save3);
router.post('/AlbumSound/foto4', upload2.single('4'), AlbumSound.save4);
router.post('/AlbumSound/foto5', upload2.single('5'), AlbumSound.save5);
router.post('/AlbumSound/foto6', upload2.single('6'), AlbumSound.save6);
router.post('/AlbumSound/foto7', upload2.single('7'), AlbumSound.save7);
router.post('/AlbumSound/foto8', upload2.single('8'), AlbumSound.save8);
router.post('/AlbumSound/foto9', upload2.single('9'), AlbumSound.save9);


//USERS.
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


module.exports = router;



