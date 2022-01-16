
const jwt = require('jsonwebtoken');
const UserP6 = require('../../models/User')

/**
 * verify if the user is authorize to do this requet
 * get the token in headers autorization
 * get the userId in encoded in the token
 * if userId is a valid id and user is in the DB , he can
 * else he can't
 */
module.exports = (req, res, next) => {
  try {
      
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;

    UserP6.findById( { _id : userId } )
    .then( ( user ) => {
        console.log("user authentifié")
        next();

    })
    .catch( ( err ) => {
        console.log(err)
        res.status(401).json({
            error: new Error('jeton invalide')
          });
    } )
    
  } catch {
         console.log("probleme dans le middleware auth.js")
        res.status(500).json({
            error: new Error('jeton invalide')
        });
  }
};