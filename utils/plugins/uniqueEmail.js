 
/**
 * @plugin for mongoose
 * if email is already use, the function throw a specific error message * 
 */
module.exports = function uniqueEmail(shema, options){
    shema.post('save', function(err, doc, next){
        
        if ( err ) {
            
            if ( err.code === 11000 ) {
                
                err = new Error(" email déjà utilisée.");
                next( err );

            } else {

                err = new Error("Une erreur est survenue lors de votre enregistrement");
                next( err );
            }
            
        } else {
            
            next();

        }
        
    })
}