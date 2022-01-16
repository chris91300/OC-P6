const mongoose = require('mongoose');
const path = require('path');
const getImageName = require('../utils/functions/getImageName');


const sauceShema = mongoose.Schema({

    //  the user id of the user who created the sauce
    userId : {
        type : String,
        required : true
    },

    //  sauce name
    name : {
        type : String,
        required : true
    },

    //  sauce manufacturer
    manufacturer : {
        type : String,
        required : true
    },

    //sauce description
    description : {
        type : String,
        required : true
    },

    //  the main spicy ingredient in the sauce
    mainPepper : {
        type : String,
        required : true
    },

    //  the URL of the sauce image uploaded by the user
    imageUrl : {
        type : String,
        required : true
    },

    //   number between 1 and 10 describing the sauce
    heat : {
        type : Number,
        required : true
    },

    // total of users who like the sauce
    likes : {
        type : Number,
        required : true,
        default : 0
    },

    //  total of users who dislike the sauce
    dislikes : {
        type : Number,
        required : true,
        default : 0
    },

    // array of userId who liked the sauce
    usersLiked : {
        type : Array,
        default : [String]
    },

    //  array of userId who disliked the sauce
    usersDisliked : {
        type : Array,
        default : [String]
    }
})

/*
sauceShema.post('save', function(err, doc, next){
    console.log("on est en post save")
    if (err){ console.log(err); next(new Error(" erreur dans bdd"))}
    else { console.log("pas d'err"); next()}
    
})*/

/**
 * return the path of the image (the old image in order to remove it with fs.unlink)
 */
sauceShema.virtual('oldPath').get(function(){
    
    let imageName = getImageName(this.imageUrl);
    let staticPath = path.resolve('./images');
    let oldImagePath = staticPath + "/" + imageName;
    
    return oldImagePath;
})

module.exports = mongoose.model('Sauce', sauceShema);