
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const Sauce = require('../models/Sauce');
const getImageName = require('../utils/functions/getImageName');


/**
 * get all the sauces in the DB
 */
exports.GETSAUCES = ( req, res, next ) =>{
    console.log("get sauces")
    Sauce.find({})
    .then( ( sauces ) => {
       /* sauces.map( (sauce) =>{
            let id = sauce._id;
            console.log("id = "+id)
            Sauce.findByIdAndDelete({ _id : id})
            .then(()=>{
                console.log("sauce supprimer")
            })
            .catch((err)=>{
                console.log(err)
            })
        })*/
        
        res.status(200).json(sauces);
    } )
    .catch( ( err ) => {// error of find
        res.status(404).json( { err } );
    } )

}

/**
 * add a new sauce in the DB
 */
exports.SAVESAUCE = ( req, res, next ) =>{
    console.log("SAVESAUCE")
    
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

    sauce.save()
    .then(()=>{
        res.status(201).json({message : "votre sauce a bien été enregistré."});
    })
    .catch((err) =>{
        res.status(500).json(err);
    })
    
}

/**
 * get the sauce with the id sended in the url
 */
exports.GETSAUCE = ( req, res, next ) =>{
    console.log("get sauce")
    let id = req.params.id;

    Sauce.findById({_id : id})
    .then( ( sauce ) => {
        res.status(200).json(sauce);
    })
    .catch( ( err ) => {
        res.status(500).json(err);
    })
}

/**
 * update the sauce with the id in parameter in the url
 */
exports.UPDATESAUCE = async ( req, res, next ) =>{
    console.log("UPDATESAUCE")
    let sauceId = req.params.id;
    let filter = { _id : sauceId };
    let update = req.file === undefined ? req.body : JSON.parse(req.body.sauce);    
    let imagePath = req.file ? req.file.path : undefined;    
    
    if ( imagePath != undefined ) {
        let imageName = getImageName(imagePath);
        let imageUrl = process.env.URLIMAGEDIRECTORY + imageName;
        update.imageUrl = imageUrl;
    }

    let sauce = await Sauce.findOneAndUpdate( filter, update );
    
    if ( imagePath != undefined ){        
        console.log("l'ancien path de l'image est ");
        console.log(sauce.oldPath)
        fs.unlinkSync(sauce.oldPath);// use sauceShema.virtual('oldpath')
    }
    

    res.status(200).json( { message : "sauce modifiée." });
    
    
}

/**
 * remove the sauce with the id in parameter into the DB
 * and remove the image on the directory images
 */
exports.DELETESAUCE = ( req, res, next ) =>{
    console.log("DELETESAUCE")
    let sauceId = req.params.id;
    let filter = { _id : sauceId };

    Sauce.findOneAndDelete(filter)
    .then( ( sauce ) => {
        
        fs.unlinkSync(sauce.oldPath);
        res.status(200).json( { message : "sauce supprimée." } );

    })
    .catch( ( err ) => {

        console.log(err)
        res.status(500).json( err );

    })
}

/**
 * users can like or dislike the sauce
 * or remove their like or dislike
 */
exports.LIKESAUCE = ( req, res, next ) =>{
    console.log("LIKESAUCE")
    let { userId , like } = req.body;
    let sauceId = req.params.id;
    
    Sauce.findById( { _id : sauceId } )
    .then( ( sauce ) => {
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

        sauce.save()
        .then( ( sauce ) => {
            
            res.status(200).json( { message : "Votre avis a bien été pris en compte."});
        })
        .catch( ( err ) => {// error of save sauce
            res.status(500).json( err )
        })
    })
    .catch( (err) => {// error of findById
        res.status(500).json( err )
    })

}