
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

// plugin who throw specific error message if email is already use
userShema.plugin(uniqueEmail);

// si j'utilise la base de donnée piiquante 
module.exports = mongoose.model('User', userShema);

// si j'utilise la base de donnée express
//module.exports = mongoose.model('UserP6', userShema);