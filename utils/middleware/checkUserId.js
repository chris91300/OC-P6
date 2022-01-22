

/**
 * verify the format of the user id
 */
 module.exports = ( req, res, next ) => {
    
    let id = req.body.userId? req.body.userId : undefined;
    let regex = /[\<\>\{\}\$]/;

    if ( id != undefined & !regex.test(id) ) {
        
        next();

    } else {
        
        res.status(403).json({ message : "identifiant de l'utilisateur incorrect."});

    }

}