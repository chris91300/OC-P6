const express = require('express');
const helmet = require('helmet');
const app = express();
const authRouter = require('./router/authRouter');
const saucesRouter = require('./router/saucesRouter');



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


  // Pour que l'on puisse autoriser à récupérer les images
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

/*app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "default-src" : ["'self'", "http://localhost:8080"],
    "script-src": ["'self'", "code.jquery.com", "'unsafe-eval'"],
    "style-src": ["'self'", "use.fontawesome.com"],
  },
}))*/



//app.use(express.static("images"));
app.use('/images/', express.static("images"));
app.use('/api/auth', authRouter);
app.use('/api/sauces', saucesRouter);



module.exports = app;