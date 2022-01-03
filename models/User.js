
const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    //  adresse e-mail de l'utilisateur
    email : { type : String, required : true, unique : true },

    //  mot de passe de l'utilisateur haché
    password : { type : String, required : true} 
})

module.exports = mongoose.model('UserP6', userShema);