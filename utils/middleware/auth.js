
const jwt = require('jsonwebtoken');
const UserP6 = require('../../models/User')

/**
 * 
 */
module.exports = (req, res, next) => {
  try {
      console.log("on est dans le middleware auth")
      
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