
/**
 * verify the format of the sauce id
 */
module.exports = ( req, res, next ) => {
    console.log("check sauce id")
    let id = req.params.id? req.params.id : undefined;
    let regex = /[\<\>\{\}\$]/;
    console.log(id)
    console.log(regex.test(id))

    if ( id != undefined & !regex.test(id) ) {
        console.log("sauce id ok")
        next();
    } else {
        console.log("sauce id invalid")
        res.status(403).json({ message : "identifiant de la sauce incorrect."});
    }

}