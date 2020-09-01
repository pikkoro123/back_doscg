const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.use('/api/series', (req, res, next) => {
    var indexs = JSON.parse(req.query.index);
    var result = [], tempValue = 1;
    if (indexs && Array.isArray(indexs) && !indexs.some(isNaN)) {
        var i;
        for(i = 0; i <= Math.max(...indexs); i++) {
            result.push(tempValue += i*2);
        }
        console.log(result);
        const numbers = {
            "x": result[indexs[0]],
            "y": result[indexs[1]],
            "z": result[indexs[2]]
        }
        return res.status(200).json({
            message: 'Get Series Successfully!',
            results: numbers
        });
    } else {
        res.status(404).json({message: 'There is something wrong!'});
    }
})

app.use('/api/equation', (req, res, next) => {
    var a = JSON.parse(req.query.a);
    var b, c;
    if (a &&  typeof a === 'number' && isFinite(a)) {
        b = 23 - a;
        c = -21 - a;

        const numbers = {
            "B": b,
            "C": c
        }
        return res.status(200).json({
            message: 'Get B and C values Successfully!',
            results: numbers
        });
    } else {
        res.status(404).json({message: 'There is something wrong!'});
    }
})


module.exports = app;