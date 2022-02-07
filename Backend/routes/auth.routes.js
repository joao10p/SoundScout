const authController = require('../controllers/auth.js');
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin); //funciona
    app.get('/signupSuccess', authController.signupSuccess);
    app.get('/signinSuccess', authController.signinSuccess); //funciona
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/menu_diretores'
    }));
    app.post('/log', passport.authenticate('local-teste',{
        successRedirect: '/menu_diretores',
        failureRedirect: '/login'
      }));
    app.get('/logout', authController.logout); //
    app.post('/signin', passport.authenticate('local-signin', {
        failureRedirect: '/login'
    }),
    function(req, res){
        req.session.save(() => {
            res.redirect('/menu_diretores');
        });
    }
    );
   

};




/*const express = require('express');
const router = express.Router();
const authController = require('../public/js/auth.js');

router.post('/register' , authController.register)

console.log("alert brunoo");

module.exports = router;*/





