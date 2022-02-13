'use strict';
var router = require('express').Router();
var AV = require('leanengine');
let cities = require('../data/cities.js')

router.get('*', function (req, res, next) {
    console.log(req.path);
    next();
})

router.get('/all', function (req, res, next) {
    res.send(cities.basics);
    next();
});
router.get('/svgPolygons/:cityId', function (req, res, next) {
    let city
    try {
        city = cities.byId(Number(req.params.cityId));
    } catch (err) {
        err.status = 400;
        next(err);
        return;
    }
    try {
        res.send(city.svgPolygons);
    } catch (err) {
        next(err);
    }
});

router.get('/:city1/:city2', async function (req, res, next) {
    let cityPair
    try {
        cityPair = [req.params.city1, req.params.city2].map(o=>Number(o)).map(cities.byId.bind(cities))
    } catch (err) {
        err.status = 400;
        next(err);
        return;
    }
    try {
        res.send(await cities.travel(cityPair));
    } catch (err) {
        next(err);
    }
});

module.exports = router;

