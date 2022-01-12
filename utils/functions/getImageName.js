

/**
 * splite the path in order to get the name of the image
 * @return { string } the image name
 */
module.exports = getImageName = (path) => {
    let pathSplited = path.split("/");
    let length = pathSplited.length;
    let lastIndex = parseInt(length) - 1;
    let imageName = pathSplited[lastIndex];

    return imageName;
}