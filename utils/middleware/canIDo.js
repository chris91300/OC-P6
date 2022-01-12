
const jwt = require('jsonwebtoken');
const Sauce = require('../../models/Sauce');


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

            res.status(403).json( { message : "unauthorized request." })
        }
    })
    .catch( (err) => {
        console.log("sauce non trouvé")
        res.status(403).json( err );
    })
}

