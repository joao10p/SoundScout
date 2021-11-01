/*var bCrypt = require('bcrypt-nodejs');
const jsonMessagesPath = __dirname + "/../../assets/jsonMessages/";
var jsonMessages = require(jsonMessagesPath + "login");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user.codigo);
  });
  // used to deserialize the user
  passport.deserializeUser(function(codigo, done) {
    User.findById(codigo).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
  
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, email, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({ where: { email: email } }).then(function(user) {
        if (user) {
          return done(null, false, jsonMessages.user.duplicate);
        }
        else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            nome: req.body.nome,
            username: req.body.username,
            numero: req.body.numero,
            cargo: req.body.cargo,
            
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
  
  passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      var User = user;
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);

      }
      User.findOne({ where: { email: email } }).then(function(user) {
        if (!user || user.status!="active") {
          return done(null, false, jsonMessages.user.email);
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, jsonMessages.user.password);
        }
        var userinfo = user.get();
        global.sessData.userinfo = userinfo;
        console.log(userinfo);
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, jsonMessages.user.error);
      });
    }
  ));
}*/

//FUNCIONA
var bCrypt = require('bcrypt-nodejs');
const { authenticate } = require('passport');
const passport = require('passport');
const jsonMessagesPath = __dirname + "/../../assets/jsonMessages/";
var jsonMessages = require(jsonMessagesPath + "login");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
  
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, email, password, done) {
      /*var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };*/
      User.findOne({ where: { email: email } }).then(function(user) {
        if (user) {
          return done(null, false, jsonMessages.user.duplicate);
        }
        else {
          //var userPassword = generateHash(password);
          var data = {
            email: email,
            password: password,
            nome: req.body.nome,
            numero: req.body.numero,
            cargo: req.body.cargo,
            
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
  
  passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
  //LOCAL SIGNIN da erro
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      var User = user;
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);

      }
      User.findOne({ where: { email: email } }).then(function(user) {
        if (!user || user.status!="active") {
          return done(null, false, {message: ' nao tem esse email'});
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {message: ' nao tem essa pass'});
        }
        var userinfo = user.get();
        global.sessData.userinfo = userinfo;
        console.log(userinfo);
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false,{message: ' outra cena'} );
      });      
    }
  ));
}

// novo metodo signin 
/*const authenticateUser = (email, password, done) => {
  const user = getUserByEmail(email)
  if (user == null){
    return done(null, false, jsonMessages.user.email)
  }
  try {
    if (await bCrypt.compare(password, user.password)){

    } else {
      return done(null,false,jsonMessages.user.password)
    }
  } catch (e){
    return done(e)
  }
}
passport.use('local-signin', new LocalStrategy({usernameField: 'email'  }), authenticateUser)
passport.serializeUser((user, done) => {})
passport.deserializeUser((codigo, done) => {})*/