const mcache = require('memory-cache');

exports.getLineBotStatusCache = (req, res, next) => {
    // console.log('getLineBotStatus middleware caching....');
    // var a = JSON.parse(req.query.a);
    // console.log('params => ' + a);
    let cachedBody = mcache.get('line-status');
    // console.log(cachedBody);
    if(cachedBody) {
        console.log('Message => getLineBotStatus get cache success!')
        res.send(cachedBody);
    } else {
        console.log('Message => getLineBotStatus cache failed, no value yet!')
        next();
    }
};

exports.putCache = (key, value) => {
    mcache.put(key, value, 1000 * 3600);
}