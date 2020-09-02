const express = require('express');

const EquationController = require('../controller/equation');
const equation_cache = require('../middleware/memory-cache/equation');

const NumberSeriesController = require('../controller/number-series');
const series_cache = require('../middleware/memory-cache/series');

const router = express.Router();

router.get("/equation", equation_cache.getEquation, EquationController.getEquation);

router.get("/series", series_cache.getSeries, NumberSeriesController.getSeries);

module.exports = router;
