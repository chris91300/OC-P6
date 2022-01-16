

/**
 * verify the format of the user id
 */
 module.exports = ( req, res, next ) => {
    console.log("check user id")
    let id = req.body.userId? req.body.userId : undefined;
    let regex = /[\<\>\{\}\$]/;

    if ( id != undefined & !regex.test(id) ) {
        console.log("user id ok")
        next();
    } else {
        console.log("user id invalid")
        res.status(403).json({ message : "identifiant de l'utilisateur incorrect."});
    }

}