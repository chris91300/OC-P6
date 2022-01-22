
/**
 * verify the format of the sauce id
 */
module.exports = ( req, res, next ) => {
    
    let id = req.params.id? req.params.id : undefined;
    let regex = /[\<\>\{\}\$]/;    

    if ( id != undefined & !regex.test(id) ) {
        
        next();

    } else {
        
        res.status(400).json({ message : "identifiant de la sauce incorrect."});

    }

}