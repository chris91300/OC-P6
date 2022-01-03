const express = require('express');
const app = express();
const authRouter = require('./router/authRouter');
const saucesRouter = require('./router/saucesRouter');



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  

app.use('/api/auth', authRouter);
app.use('/api/sauces', saucesRouter);



module.exports = app;