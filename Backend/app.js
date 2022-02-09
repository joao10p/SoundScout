const express = require('express');
const { router } = require('server');
const app = express()
const port = 3000
const mainRoutes = require('./routes/main.routes');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const models = require('./models/');
const { connect } = require('./config/connect');
const connection = require('./config/connect');
const fileUpload = require('express-fileupload');
//var imageRouter = require('./routes/image-route');
var MySQLStore = require('express-mysql-session')(session);
//var LocalStrategy = require('passport-local').Strategy;
//var bcrypt = require('bcrypt');

//cors
app.use((req,res,next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
}
)
// Static Files
app.use(express.static('public'));
// Specific folder example
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
//app.use('/', imageRouter);
// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('',  (req, res) => {
  //console.log(req.user);
  //console.log(req.isAuthenticated());
    res.sendFile(__dirname + '/views/index.html')
})

var options = {
  host: 'remotemysql.com',
  user: 'AOlZ2PiCPa',
  password: 'c72uob9rs6',
  database: 'AOlZ2PiCPa'
};

var sessionStore = new MySQLStore(options);

app.use(require("express-session")({
  secret: 'our super secret session secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
 
  
  /*cookie: {
    maxAge: 3600000,
    //secure: true,
    httpOnly: true
  }*/
}));
//zona do fetch
//app.use(bodyParser.json(),bodyParser.urlencoded({extend:true}));
app.use(expressSanitizer());
//app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

//midleware passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//BODY PARSER
app.use(bodyParser.json(),bodyParser.urlencoded({extend:true}));
app.use(express.urlencoded({ extended: false }))

//Add another Page

app.get('/sound', (req, res) => {
   res.sendFile(__dirname + '/views/sound.html')
})

app.get('/scout', (req,res) => {
  res.sendFile(__dirname + '/views/scout.html')
})

app.get('/menu', (req,res) => {
  res.sendFile(__dirname + '/views/menu.html')
})

app.get('/bola', (req,res) => {
  res.sendFile(__dirname + '/views/bola.html')
})

app.get('/index_en', (req,res) => {
  res.sendFile(__dirname + '/views/index_en.html')
})

app.get('/equipa_scout', (req,res) => {
  res.sendFile(__dirname + '/views/equipa_scout.html')
})

app.get('/equipa_scout_en', (req,res) => {
  res.sendFile(__dirname + '/views/equipa_scout_en.html')
})

app.get('/equipa_sound', (req,res) => {
  res.sendFile(__dirname + '/views/equipa_sound.html')
})

app.get('/equipa_sound_en', (req,res) => {
  res.sendFile(__dirname + '/views/equipa_sound_en.html')
})

app.get('/galeria_id', (req,res) => {
  res.sendFile(__dirname + '/views/galeria_id.html')
})


app.get('/galeria_scout', (req,res) => {
  res.sendFile(__dirname + '/views/galeria_scout.html')
})
app.get('/galeria_sound', (req,res)=> {
  res.sendFile(__dirname + '/views/galeria_sound.html')
})
app.get('/menu_diretores',checkAuthenticated, (req,res) => {

  res.sendFile(__dirname + '/views/menu_diretores.html')
})

app.get('/revista_id', (req,res) => {
  res.sendFile(__dirname + '/views/revista_id.html')
})

app.get('/revista_scout', (req,res) => {
  res.sendFile(__dirname + '/views/revista_scout.html')
})

app.get('/revista_sound', (req,res) => {
  res.sendFile(__dirname + '/views/revista_sound.html')
})

app.get('/scout', (req,res) => {
  res.sendFile(__dirname + '/views/scout.html')
})

app.get('/sound', (req,res) => {
  res.sendFile(__dirname + '/views/sound.html')
})


app.get('/musica', (req,res) => {
  res.sendFile(__dirname + '/views/musica.html')
})

app.get('/upload', (req,res) => {
  res.sendFile(__dirname + '/views/upload.html')
})

app.get('/teste', (req,res) => {
  res.sendFile(__dirname + '/views/teste.html')
})
app.get('/try', (req,res) => {
  res.sendFile(__dirname + '/views/try.html')
})

app.get('/revista_id_sound', (req,res) => {
  res.sendFile(__dirname + '/views/revista_id_sound.html')
})

app.get('/revista_id_scout', (req,res) => {
  res.sendFile(__dirname + '/views/revista_id_scout.html')
})

app.get('/galeria_id_sound', (req,res) => {
  res.sendFile(__dirname + '/views/galeria_id_sound.html')
})


app.get('/galeria_id_scout', (req,res) => {
  res.sendFile(__dirname + '/views/galeria_id_scout.html')
})

app.get('/try', (req,res) => {
  res.sendFile(__dirname + '/views/try.html')
})

app.get('/login',checkNotAuthenticated, (req,res) => {
  res.sendFile(__dirname + '/views/login.html')
})
//USA AS ROTAS PARA IR BUSCAR OS CONTROLLERS E AS PAGINAS
app.use('/', mainRoutes);


module.exports = app;

module.exports = app;
//cookies 
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



//Criacao do server
app.listen(port, () => console.info(`App listening on port ${port}`))

//app.use('/auth', require('./routes/auth'));

require('./routes/auth.routes.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});

////login

function checkAuthenticated(req, res , next){
  if(req.isAuthenticated()){
     return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
   return  res.redirect('/menu_diretores')
  }
   next()
}


/*
const express = require('express');
const app = express();
const port = 3000;
var router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const session = require('express-session');
const mainRoutes = require('./routes/main.routes.js');
const helmet = require('helmet');
const contentSecurityPolicy = require("helmet-csp");
const csrf = require('csurf');
const bcrypt = require('bcrypt');
const passport = require('passport');
const models = require('./models/');
const flash = require('express-flash');
const http = require('http');
const fs = require('fs');
const path = require('path')
const multer = require('multer'); //usado para a foto 
const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, 'Images')
  },
  filename:(req, file, cb) =>{
    console.log(file)
    cb(null,Date.now()+ path.extname(file.originalname))
  },

}); //fotos tambem 

const upload = multer({storage:storage })//fotos

app.set("view engine", "ejs");

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

fs.readFile('./index.html', function (err, html) {

  if (err) throw err;    

  http.createServer(function(request, response) {  
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();  
  }).listen(port);
});

//SECÇÃO EXPERIMENTAL DE FOTOS
app.get("/upload", (req,res) => {
  res.render("upload");
});

app.post("./upload",upload.single("image"),(req,res) =>{  //ATENÇAO! SE SO CONSEGUIRMOS ADICIONAR UMA FOTO O ERRO PODE ESTAR NO SINGLE
  res.send("Image Uploaded")
});


  //app.use(express.static(__dirname, { index: '../../startbootstrap-grayscale-gh-pages/index.html' })); nao sei o que e
    
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static("public"))

app.use('/', mainRoutes);



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
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
app.use(passport.session()); // persistent login sessions
require('./routes/auth.routes.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});

module.exports = app;


*/

















/*const express = require('express');
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
const port = 3000;
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


app.get('/', function(req, res) {
  res.json({status: 'Server is running!'})
})
app.listen(port, function() {
  console.log(`Server is running at localhost:${port}`)
})

var server = http.createServer(function(request, response) {
  console.log('Request!')
})
server.listen(port)
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
  */
  /*const hostname = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;
  //const homepage = require('../../startbootstrap-grayscale-gh-pages/index.html');
  const express = require('express');
  const app = express();
  //const port = 3000
  const cors = require('cors');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const expressSanitizer = require('express-sanitizer');
  //const expressValidator = require('express-validator');
  const session = require('express-session');
  const mainRoutes = require('./routes/main.routes.js');
  //const scnRoutes = require('../../Frontoffice/route/main.routes.js');
  const helmet = require('helmet');
  const contentSecurityPolicy = require("helmet-csp");
  const csrf = require('csurf');
  const bcrypt = require('bcrypt');
  const passport = require('passport');
  const models = require('./models/');
  const flash = require('express-flash');
  const http = require('http');
  
 /* const server = http.createServer(function(req,res){
    res.writeHead(200,{ 'Content-Type': 'text/html'})
    fs.readFile('index.html',function(error,data){
      if(error){
        res.writeHead(404)
        res.write('Error: File Not Found')
      }else {
        res.write(data);
      }
      res.end();
    })
  });
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

  app.listen(port, function(err){
    if (!err) {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
    else {
        console.log(err);
    }
});

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
  
  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
  app.use(expressSanitizer());
  
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
  
  
  /*app.listen(port, function() {
    console.log('Example app listening on port ' + port + '!');
  });
  app.get('/', function(req, res) {
    res.json({status: 'Server is running!'})
  })
  //app.use(expressValidator());
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
      //req.sanitize(item).escape();  // FALAR COM O STOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  app.use(passport.session()); // persistent login sessions
  require('./routes/auth.routes.js')(app, passport);
  require('./config/passport/passport.js')(passport, models.user);
  //Sync Database
  models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
  
  }).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });
  
  module.exports = app;
 */ 
