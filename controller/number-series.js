const series_cache = require('../middleware/memory-cache/series');

exports.getSeries = (req, res, next) => {
    var indexs = JSON.parse(req.query.index);
    var result = [], tempValue = 1;
    var addValue = -2, currentValue = 5;   
    if (indexs && Array.isArray(indexs) && !indexs.some(isNaN)) {
        var i;
        for(i = 0; i <= Math.max(...indexs); i++) {
            result.push(currentValue += addValue);
            addValue += 2;
        }
        // console.log(result);
        const numbers = {
            "x": result[indexs[0]],
            "y": result[indexs[1]],
            "z": result[indexs[2]]
        }
        series_cache.putCache(indexs, numbers);
        return res.status(200).json({
            message: 'Get Series Successfully!',
            results: numbers
        });
    } else {
        res.status(404).json({message: 'There is something wrong!'});
    }
}