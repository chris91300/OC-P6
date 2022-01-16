const res = require("express/lib/response");


/**
 * splite the path in order to get the name of the image
 * @return { string } the image name
 */
module.exports = getImageName = (path) => {
    try{
        let pathSplited = path.split("/");
        let length = pathSplited.length;
        let lastIndex = parseInt(length) - 1;
        let imageName = pathSplited[lastIndex];

        return imageName;
    } catch (err) {
        res.status(500).json( { message : "Une erreur est survenue" } )
    }
    
}