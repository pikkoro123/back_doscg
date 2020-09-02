const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const equation_cache = require('../middleware/memory-cache/equation');
const series_cache = require('../middleware/memory-cache/series');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.use('/api/series', series_cache.getSeries, (req, res, next) => {
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
})

app.use('/api/equation', equation_cache.getEquation, (req, res, next) => {
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
})

/*function cache(req, res, next) {
    console.log('middleware caching....');
    // const { username } = req.params;
    var a = JSON.parse(req.query.a);
    // var a = 'key';
    // let cachedBody = mcache.get(username);
    let cachedBody = mcache.get(a);
    if(cachedBody) {
        console.log('SENDING CACHE BY KEY => '  + a);
        res.send(cachedBody);
    } else {
        next();
    }
}*/

module.exports = app;