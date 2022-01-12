

module.exports = function uniqueEmail(shema, options){
    shema.post('save', function(err, doc, next){
        console.log("on est en post save")
        if ( err ) {
            if ( err.code === 11000 ) {
                next(new Error(" email déjà utilisée."));
            } else {
                next( err );
            }
            
        } else {
            next();
        }
        
    })
}