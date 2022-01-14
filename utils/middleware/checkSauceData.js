
const fs = require('fs');
const path = require('path');
const getImageName = require('../functions/getImageName');

module.exports = ( req, res, next ) => {
    console.log("on est dans checkSauceData");
    let data = req.file === undefined ? req.body : JSON.parse(req.body.sauce);    
    let imagePath = req.file ? req.file.path : undefined; 
    let regex = /[\<\>\{\}\$]/;
    let userId = data.userId;
    let  name = data.name;
    let  manufacturer = data.manufacturer;
    let  description = data.description;
    let mainPepper = data.mainPepper;
    let heat = data.heat;
    console.log(data)
    console.log("test de name")
    console.log(regex.test(name))

    if ( 
        userId != undefined & !regex.test(userId) &
        name != undefined & !regex.test(name) &
        manufacturer != undefined & !regex.test(manufacturer) &
        description != undefined & !regex.test(description) &
        mainPepper != undefined & !regex.test(mainPepper) &
        heat != undefined & !regex.test(heat)
    ) {
        console.log("input présent et valides");
        next();

    } else {
        console.log("problème avec inputs")
        if ( imagePath != undefined ) {
            console.log("il y a une image")
            let imageName = getImageName(req.file.path);  
            let staticPath = path.resolve('./images');  
            let imagePath = staticPath + "/" + imageName;
            fs.unlink(imagePath, ()=>{
                console.log("image supprimé");
                console.log(imagePath)
            });
        }

        res.status(401).json( { message : "champs invalides."});
    }



}