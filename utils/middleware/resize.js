const fs = require('fs');
const jimp = require('jimp');
const sharp = require('sharp');

module.exports = async ( req, res, next ) => {
    console.log("on est dans resize middleware");
    let imagePath = req.file ? req.file.path : undefined; 

    if ( imagePath ) {
        try{
            let imagePathOutput = imagePath.replace(/\.jpeg|\.jpg|\.png$/, ".webp");
            let img = await sharp(imagePath).resize(700, 525).toFormat('webp');

            img.toFile(imagePathOutput, (err, img)=>{
                if (err) throw err;

                req.file.path = imagePathOutput;
                fs.unlink(imagePath, (err)=>{
                    if (err) throw err;
                    console.log("imagePath supprimé")
                })
                next()

            });
            
           
        }catch(err){
            console.log(err)
            res.status(500).json( { message : "Une erreur est survenue." } );
        }
        

    } else {
        next();
    }

}