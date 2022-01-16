
const jwt = require('jsonwebtoken');
const Sauce = require('../../models/Sauce');

/**
 * verify if the userId of the sauce is the same as the id in the token
 * if is the same, the user can do update or delete the sauce
 * else he can't
 */
module.exports = ( req, res, next ) => {
    console.log("on est dans canIDo");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;

    let sauceId = req.params.id;
    let filter = { _id : sauceId };
    Sauce.findById( filter )
    .then( (sauce) => {
        console.log("sauce trouvé dans la bdd")
        if ( sauce.userId === userId ) {
            console.log("sauce .userId === userId")
            next();
        }
        else {
            console.log("sauce .userId != userId")

            res.status(401).json( { message : "Action non autorisée." })
        }
    })
    .catch( (err) => {
        console.log("sauce non trouvé")
        res.status(400).json(  { message : "Sauce non répertoriée." });
    })
}

