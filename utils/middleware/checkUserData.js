

/**
 * Verify if data send by the user for singup or login are valid
 * check password and email
 * in order to block SQL or script injection
 */
module.exports = (req, res, next) => {
    
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let password = req.body.password;
    let email = req.body.email;

    if ( password != undefined &
        regexPassword.test(password) &
        email != undefined &
        regexEmail.test(email) ) {

        next();

    }
    else {
        
        res.status(400).json( { message : "Données invalides."} );
        
    }
}