
const fs = require('fs');
const path = require('path');
const getImageName = require('../functions/getImageName');


/**
 * verify each input value when user save or update a sauce
 * special character are not allowed in order to block SQL or script injection
 */
module.exports = ( req, res, next ) => {
    
    let data = req.file === undefined ? req.body : JSON.parse(req.body.sauce);    
    let imagePath = req.file ? req.file.path : undefined; 
    let regex = /[\<\>\{\}\$]/;
    let userId = data.userId;
    let  name = data.name;
    let  manufacturer = data.manufacturer;
    let  description = data.description;
    let mainPepper = data.mainPepper;
    let heat = data.heat;

    if ( 
        userId != undefined & !regex.test(userId) &
        name != undefined & !regex.test(name) &
        manufacturer != undefined & !regex.test(manufacturer) &
        description != undefined & !regex.test(description) &
        mainPepper != undefined & !regex.test(mainPepper) &
        heat != undefined & !regex.test(heat)
    ) {
        
        next();

    } else {
       
        if ( imagePath != undefined ) {
            
            let imageName = getImageName(req.file.path);  
            let staticPath = path.resolve('./images');  
            let imagePath = staticPath + "/" + imageName;
            fs.unlink(imagePath, ()=>{
                console.log("image supprimé");
                
            });
        }

        res.status(400).json( { message : "champs invalides."});
    }



}