const equation_cache = require('../middleware/memory-cache/equation');

exports.getEquation = (req, res, next) => {
    // const { a } = req.params;
    // console.log('a..');
    // console.log(req.params);
    var a = JSON.parse(req.query.a);
    var b, c;
    if (a &&  typeof a === 'number' && isFinite(a)) {
        b = 23 - a;
        c = -21 - a;

        const numbers = {
            "B": b,
            "C": c
        }

        var result = {
            message: 'Get B and C values Successfully!',
            results: numbers
        };
        console.log('put cache equation use key ...' + a);
        equation_cache.putCache(a, result);

        return res.status(200).json(result);
    } else {
        res.status(404).json({message: 'There is something wrong!'});
    }
}