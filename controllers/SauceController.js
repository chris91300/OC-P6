
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const Sauce = require('../models/Sauce');
const getImageName = require('../utils/functions/getImageName');


/**
 * get all the sauces in the DB
 */
exports.GETSAUCES = async ( req, res ) =>{
    
    try{

        let sauces = await Sauce.find({});         
        res.status(200).json(sauces);

    } catch ( err )  {// error of find

        res.status(500).json( { message : "Une erreur est survenue" } );
    } 
    

}

/**
 * add a new sauce in the DB
 */
exports.SAVESAUCE = async ( req, res ) =>{
    
    let { name, manufacturer, description, mainPepper, heat, userId } = JSON.parse(req.body.sauce);
    let imageName = getImageName(req.file.path);    
    let imageUrl = process.env.URLIMAGEDIRECTORY + imageName;

    let data = {
        userId : userId,
        name : name,
        manufacturer : manufacturer,
        description : description,
        mainPepper : mainPepper,
        imageUrl : imageUrl,
        heat : heat
    };

    let sauce = new Sauce(data);

    try{
        sauce = await sauce.save();

        if ( sauce ){

            res.status(201).json({message : "votre sauce a bien été enregistré."});

        }
    } catch (err){

        res.status(500).json({message : "Une erreur est survenue. Votre sauce n'a pas été enregistrée."});

    }
    
   
    
}

/**
 * get the sauce with the id sended in the url
 */
exports.GETSAUCE = async ( req, res ) =>{
    
    let id = req.params.id;    

    try{

        let sauce = await Sauce.findById({_id : id});
        res.status(200).json(sauce);

    } catch (err) {

        res.status(400).json( { message : "Sauce non trouvé" } );

    }

}

/**
 * update the sauce with the id in parameter in the url
 */
exports.UPDATESAUCE = async ( req, res ) =>{
    
    let sauceId = req.params.id;
    let filter = { _id : sauceId };
    let update = req.file === undefined ? req.body : JSON.parse(req.body.sauce);    
    let imagePath = req.file ? req.file.path : undefined;    
    
    if ( imagePath != undefined ) {

        let imageName = getImageName(imagePath);
        let imageUrl = process.env.URLIMAGEDIRECTORY + imageName;
        update.imageUrl = imageUrl;

    }

    try {

        let sauce = await Sauce.findOneAndUpdate( filter, update );
    
        if ( imagePath != undefined ){        
            
            fs.unlinkSync(sauce.oldPath);// use sauceShema.virtual('oldpath')

        }        

        res.status(200).json( { message : "sauce modifiée." });

    } catch(err) {

        res.status(500).json( { message : "Une erreur est survenue lors de la mise à jour de votre sauce" } );

    }
    
    
    
}

/**
 * remove the sauce with the id in parameter into the DB
 * and remove the image on the directory images
 */
exports.DELETESAUCE = async ( req, res ) =>{
    
    let sauceId = req.params.id;
    let filter = { _id : sauceId };

    try{

        let sauce = await Sauce.findOneAndDelete(filter);
        fs.unlinkSync(sauce.oldPath);
        res.status(200).json( { message : "sauce supprimée." } );

    } catch (err){

        res.status(400).json( { message : "Sauce non répertoriée." } )

    }

}

/**
 * users can like or dislike the sauce
 * or remove their like or dislike
 */
exports.LIKESAUCE = async ( req, res ) =>{
    
    let { userId , like } = req.body;
    let sauceId = req.params.id;

    try{

        let sauce = await Sauce.findById( { _id : sauceId } );

        switch(like) {
            case 1 :
                
                if ( sauce.usersLiked.indexOf(userId) === -1 ) {
                    
                    sauce.usersLiked.push(userId);
                    sauce.likes++;
                }                
                break;
            
            case -1 :
                
                if ( sauce.usersDisliked.indexOf(userId) === -1 ) {
                   
                    sauce.usersDisliked.push(userId);
                    sauce.dislikes++;
                }
                break;

            case 0 : 
            
                let index = sauce.usersLiked.indexOf(userId);
                if ( index != -1 ) {
                    
                        sauce.usersLiked.splice(index, 1);
                        sauce.likes--;
                    
                   
                } else {
                    
                    index = sauce.usersDisliked.indexOf(userId);
                    if ( index != -1 ) {
                        
                        sauce.usersDisliked.splice(index, 1);
                        sauce.dislikes--;
                    }
                }

                break;
            
            default :

                throw new Error("vous aimez ou pas cette sauce?")

        }

        try{

            let sauceSaved = await sauce.save();

            if ( sauceSaved ) {
                
                res.status(200).json( { message : "Votre avis a bien été pris en compte."});

            }

        }catch (err) {

            res.status(500).json( { message : "Une erreur est survenue." } )

        }
        

    } catch (err) {

        res.status(400).json( { message : "Sauce non répertoriée." } )

    }
    
    

}