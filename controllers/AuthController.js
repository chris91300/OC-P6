const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const UserModel = require('../models/User');
const { find } = require('../models/User');
require("dotenv").config();



/**
 * save a new user in the database
 */
exports.SIGNUP = async ( req, res ) =>{
    
    let email = req.body.email;
    let password = req.body.password;    

    try{ // try to get a hashed password 

        let hash = await bcrypt.hash(password, 10);

        let data = {
            email : email,
            password : hash
        };

        let user = new UserModel(data);

        try{// try to save the new User

            let newUser = await user.save()

            if ( newUser ) {

                res.status(201).json({message : "utilisateur créé."});

            }

        } catch (err) {// catch save user
            
            res.status(400).json({ message : err.message })
        }
        

    } catch ( err ) {// catch hash password
        
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    }
        

}

/**
 * when user try to connecte himself
 * get user in the DB and compare the passwords
 * if they are the same password user can be connected
 * else connection refused
 */
exports.LOGIN = async ( req, res, next ) =>{
    
    let email = req.body.email;
    let password = req.body.password;    

    try{ // try to find the user and compare the two passwords
       
        let user = await UserModel.findOne( { email : email } );
        
        let hash = user.password;
        let passwordIsTheSame = await bcrypt.compare(password, hash);
        
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
            
            res.status(400).json({ message : "Password invalide"});
        }

    } catch(err){// catch find user
        
        res.status(400).json({ message : "Utilisateur inconnu" })
        
    }
        
}