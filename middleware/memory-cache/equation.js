const mcache = require('memory-cache');

exports.getEquation = (req, res, next) => {
    console.log('getEquation middleware caching....');
    var a = JSON.parse(req.query.a);
    console.log('params => ' + a);
    let cachedBody = mcache.get(a);
    // console.log(cachedBody);
    if(cachedBody) {
        console.log('Message => getEquation get cache success!')
        res.send(cachedBody);
    } else {
        console.log('Message => getEquation cache failed, no value yet!')
        next();
    }
};

exports.putCache = (key, value) => {
    mcache.put(key, value, 1000 * 3600);
}