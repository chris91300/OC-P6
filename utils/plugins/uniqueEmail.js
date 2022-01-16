 

module.exports = function uniqueEmail(shema, options){
    shema.post('save', function(err, doc, next){
        console.log("on est en post save")
        if ( err ) {
            
            if ( err.code === 11000 ) {
                console.log("email deja use")
                err = new Error(" email déjà utilisée.");
                next( err  );
            } else {
                err = new Error("Une erreur est survenue lors de votre enregistrement");
                
                next( err );
            }
            
        } else {
            next();
        }
        
    })
}