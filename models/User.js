
const mongoose = require('mongoose')
const uniqueEmail = require('../utils/plugins/uniqueEmail')

const userShema = mongoose.Schema({

    //  user email. must be unique
    email : {
        type : String,
        required : true,
        unique : true
    },

    //  hashed user password
    password : {
        type : String,
        required : true
    } 
})

// peut être à supprimer car aucun intêret vue que unique : true
userShema.plugin(uniqueEmail);


module.exports = mongoose.model('UserP6', userShema);