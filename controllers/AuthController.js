const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const UserP6 = require('../models/User');
require("dotenv").config();



/**
 * save a new user in the database
 */
exports.SIGNUP = ( req, res ) =>{
    
    let email = req.body.email;
    let password = req.body.password;    

    bcrypt
    .hash(password, 10)
    .then( (hash) => {
        
        let data = {
            email : email,
            password : hash
        };

        let user = new UserP6(data);

        user.save()
        .then( () => {
            
            res.status(201).json({message : "utilisateur créé."});

        })
        .catch( (err) => {// error of save
            console.log("erreur de save")
            
            res.status(400).json({ message : err.message })
        })
    })
    .catch( (err) => {// error of hash
        console.log("erreur de hash")
        console.log(err)
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    })
        

}

/**
 * when user try to connecte himself
 * get user in the DB and compare the passwords
 * if they are the same password user can be connected
 * else connection refused
 */
exports.LOGIN = ( req, res, next ) =>{
    
    let email = req.body.email;
    let password = req.body.password;    

    UserP6.findOne( { email : email } )
    .then( ( user ) => {
        
        let hash = user.password;
        let passwordIsTheSame = bcrypt.compareSync(password, hash);

        if( passwordIsTheSame ) {

            let token = jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
                );

            let userdata = {
                userId : user._id,
                token : token
            };

            res.status(200).json(userdata);


        } else {
            console.log("user trouvé mais password invalide")
            res.status(400).json({ message : "Password invalide"});
        }

    })
    .catch( (err) => {// error of findOne
        console.log("erreur user not find")
        console.log(err)
        res.status(400).json({ message : "Utilisateur inconnu" })
    })
        
}