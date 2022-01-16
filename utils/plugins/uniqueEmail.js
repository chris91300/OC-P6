 

module.exports = function uniqueEmail(shema, options){
    shema.post('save', function(err, doc, next){
        console.log("on est en post save")
        if ( err ) {
            
            if ( err.code === 11000 ) {
                console.log("email deja use")
                let errStillUse = new Error(" email déjà utilisée.");
                next( errStillUse  );
            } else {
                console.log("aytre err")
                
                next( err );
            }
            
        } else {
            next();
        }
        
    })
}