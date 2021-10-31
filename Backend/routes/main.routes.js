const express = require ('express');
const router = express.Router();
const Galer = require ('../controllers/galeria.controller.js');
const User = require ('../controllers/users.controller.js');
const Scout = require('../controllers/scout.controller.js');
const Sound = require('../controllers/sound.controller.js');

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

//SCOUT
router.get('/scout', Scout.read);
router.get('/scout/:id', Scout.readID);
router.post('/scout/', Scout.save);
router.put('/scout/:id', Scout.update);
router.delete('/scout/:id', Scout.deleteID);

//SOUND
router.get('/sound', Sound.read);
router.get('/sound/:id', Sound.readID);
router.post('/sound/', Sound.save);
router.put('/sound/:id', Sound.update);
router.delete('/sound/:id', Sound.deleteID);

module.exports = router;
console.log('Passou as rotas');


