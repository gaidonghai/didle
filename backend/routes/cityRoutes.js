'use strict';
var router = require('express').Router();
var AV = require('leanengine');
let cities = require('../module/cities.js')

router.get('*', function (req, res, next) {
    console.log(req.path);
    next();
})

router.get('/all', function (req, res) {
    res.send(cities.basics());
});
/*
router.get('/:cityId', function (req, res, next) {
    let target = cities[req.params.cityId];
    if (target) {
        res.send(target);
    } else {
        throw 'cityId invalid.'
    }
});

router.get('/svg/:cityId', function (req, res, next) {
    let target = cities[req.params.cityId];
    if (target) {
        res.send(target.svg)
    } else {
        throw 'cityId invalid.'
    }
});
*/
router.get('/svgPolygons/:cityId', function (req, res, next) {
    let city=cities.byId(req.params.cityId);
    if (city) {
        res.send(city.svgPolygons);
    } else {
        res.sendStatus(400)
    }
});

router.get('/:city1/:city2', async function (req, res, next) {
    let city1 = cities.byId(req.params.city1);
    let city2 = cities.byId(req.params.city2);
    if (city1 && city2) {
        res.send(await city1.travelTo(city2));
    } else {
        res.sendStatus(400)
    }
});

module.exports = router;

