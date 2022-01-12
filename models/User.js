
const mongoose = require('mongoose')
const uniqueEmail = require('../utils/plugins/uniqueEmail')

const userShema = mongoose.Schema({
    //  adresse e-mail de l'utilisateur
    email : { type : String, required : true, unique : true },

    //  mot de passe de l'utilisateur haché
    password : { type : String, required : true} 
})

userShema.plugin(uniqueEmail);


module.exports = mongoose.model('UserP6', userShema);