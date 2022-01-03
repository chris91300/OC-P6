require("dotenv").config();


const PORT = parseInt(process.env.PORT);
const PATHDB = process.env.PATHDB;
const http = require('http');
const mongoose = require('mongoose');

/***************************************************** */
//  CONNECTION À LA BASE DE DONNÉES MONGODB
/***************************************************** */


mongoose.connect(PATHDB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((err) => {console.log('Connexion à MongoDB échouée !'); console.log(err);});


/***************************************************** */
//  FIN DE CONNECTION À LA BASE DE DONNÉES MONGODB
/***************************************************** */

const app = require("./app");



app.listen(PORT,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ PORT)
});