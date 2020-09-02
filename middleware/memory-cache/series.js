const mcache = require('memory-cache');

exports.getSeries = (req, res, next) => {
    console.log('getSeries middleware caching....');
    var indexs = JSON.parse(req.query.index);
    console.log('params => ' + indexs);
    let cachedBody = mcache.get(indexs);
    if(cachedBody) {
        console.log('Message => getSeries get cache success!')
        res.send(cachedBody);
    } else {
        console.log('Message => getSeries cache failed, no value yet!')
        next();
    }
};

exports.putCache = (key, value) => {
    mcache.put(key, value, 1000 * 3600);
}