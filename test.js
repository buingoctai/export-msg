const hashResource = (url, path) => {
    const crypto = require("crypto");
    const index = crypto.createHash("md5").update(url + path).digest("hex");
    return index;
}


console.log(hashResource('https://www.npmjs.com/package/image-size', '/test'));