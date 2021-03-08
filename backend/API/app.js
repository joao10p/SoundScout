const express = require('express');
const app = express();
const http = require("http");
const helmet = require('helmet');
const contentSecurityPolicy = require("helmet-csp");
const csrf = require('csurf');
const bcrypt = require('bcrypt');
const passport = require('passport');
const models = require('./models/');
const flash = require('express-flash');
const host = 'localhost';
const port = 3001;
const session = require('express-session');
const mainRoutes = require('./routes/main.routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const requestListener = function (req, res) {};

/*const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server a correr em http://${host}:${port}`);
});

*/
app.get('/', function(req, res) {
  res.json({status: 'Server is running!'})
})
app.listen(port, function() {
  console.log(`Server is running at localhost:${port}`)
})

var server = http.createServer(function(request, response) {
  console.log('Request!')
})
server.listen(3000)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'our super secret session secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    secure: true,
    httpOnly: true
  }
}));

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
//app.use(expressSanitizer());

app.use('/', mainRoutes);
app.use(
    contentSecurityPolicy({
      defaultSrc: ["'self'"],
      scriptSrc: ['*.google-analytics.com'],
      styleSrc: ["'unsafe-inline'"],
      imgSrc: ['*.google-analytics.com'],
      connectSrc: ["'none'"],
      fontSrc: [],
      objectSrc: [],
      mediaSrc: [],
      frameSrc: []
    })
  );
app.use(cors());
app.use(cookieParser());

app.use(function(req, res, next) {
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, {
      maxAge: 900000,
      httpOnly: true,
      secure: true
    });
    console.log('cookie created successfully');
  }
  else {
    console.log('cookie exists', cookie);
  }
  next();
});

app.use(function(req, res, next) {
  for (var item in req.body) {
    //req.sanitize(item).escape();  
  }
  next();
});

app.use(function(req, res, next) {
    // check if session exists
    if (global.sessData === undefined) {
      global.sessData = req.session;
      global.sessData.ID = req.sessionID;
    }
    else { // yes, cookie was already present
      console.log('session exists', global.sessData.ID);
    }
    next();
  });
  
  app.use(passport.initialize());
  app.use(passport.session()); // persisent login sessions
  require('./routes/auth.routes.js')(app, passport);
  require('./config/passport/passport.js')(passport, models.user);
  //Sync Database
  
  models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
  
  }).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

  module.exports = app;
  