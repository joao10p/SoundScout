const authController = require('../controllers/auth.js');
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin); //funciona
    app.get('/signupSuccess', authController.signupSuccess);
    app.get('/signinSuccess', authController.signinSuccess); //funciona
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup'
    }));
    app.get('/logout', authController.logout); //
    app.post('/signin', passport.authenticate('local-signin', { // funciona
        successRedirect: '/signinSuccess',
        failureRedirect: '/signin'
    }));

};