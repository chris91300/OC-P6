
const Sauce = require('../models/Sauce');



exports.GETSAUCES = ( req, res, next ) =>{
    console.log("get sauces")
    Sauce.find({})
    .then( ( sauces ) => {
        console.log(sauces)
        res.status(200).json(sauces);
    } )
    .catch( ( err ) => {
        res.status(404).json( { err } );
    } )

}


exports.SAVESAUCE = ( req, res, next ) =>{
    console.log("SAVESAUCE")
}


exports.GETSAUCE = ( req, res, next ) =>{
    console.log("get sauce")
}


exports.UPDATESAUCE = ( req, res, next ) =>{
    console.log("UPDATESAUCE")
}


exports.DELETESAUCE = ( req, res, next ) =>{
    console.log("DELETESAUCE")
}


exports.LIKESAUCE = ( req, res, next ) =>{
    console.log("LIKESAUCE")
}