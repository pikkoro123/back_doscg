// Cache middleware
const mcache = require('memory-cache');

// function cache(req, res, next) {
module.exports = (req, res, next) => {
    console.log('middleware caching....');
    const { username } = req.params;
    console.log('params => ' + username);
    let cachedBody = mcache.get(username);
    if(cachedBody) {
        console.log('Message => get cache success!')
        res.send(setResponse(username, cachedBody));
    } else {
        console.log('Message => get cache failed, no value yet!')
        next();
    }
}