const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const UserP6 = require('../models/User');
require("dotenv").config();




exports.SIGNUP = ( req, res, next ) =>{
    console.log("sign up")
    
    let email = req.body.email;
    let password = req.body.password;    

    bcrypt.hash(password, 10)
    .then( (hash) => {
        
        let data = {
            email : email,
            password : hash
        };

        let user = new UserP6(data);

        user.save()
        .then( (response) => {
            
            res.status(201).json({message : "utilisateur créé."});

        })
        .catch( (err) => {
            console.log("erreur de save")
            //console.log(err)
            res.status(404).json({ err })
        })
    })
    .catch( (err) => {
        console.log("erreur de hash")
        console.log(err)
        res.status(404).json({ err })
    })
        

}


exports.LOGIN = ( req, res, next ) =>{
    console.log("login")
    
    let email = req.body.email;
    let password = req.body.password;    

    UserP6.findOne( { email : email } )
    .then( ( user ) => {
        console.log("user trouvé")
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
            res.status(400).json(new Error("password invalide"));
        }

    })
    .catch( (err) => {
        console.log("erreur user not find")
        console.log(err)
        res.status(401).json({ err })
    })
        
}