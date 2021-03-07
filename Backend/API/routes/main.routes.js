const express = require ('express');
const router = express.Router();
const Galer = require ('../controllers/galeria.controller.js');
const User = require ('../controllers/users.controller.js');

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

module.exports = router;
console.log('Passou as rotas');


