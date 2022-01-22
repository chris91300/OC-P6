require("dotenv").config();


const PORT = parseInt(process.env.PORT);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PATH = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.s0lwf.mongodb.net/piiquante?retryWrites=true&w=majority`;
const http = require('http');
const mongoose = require('mongoose');

/***************************************************** */
//  CONNECTION À LA BASE DE DONNÉES MONGODB
/***************************************************** */


mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((err) => {console.log('Connexion à MongoDB échouée !'); console.log(err);});


/***************************************************** */
//  FIN DE CONNECTION À LA BASE DE DONNÉES MONGODB
/***************************************************** */

const app = require("./app");



app.listen(PORT,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ PORT)
});