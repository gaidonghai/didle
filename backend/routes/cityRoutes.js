'use strict';
var router = require('express').Router();
var AV = require('leanengine');
let cities = require('../module/cities.js')

router.get('/all', function (req, res) {
    res.send(cities.filter(o=>o).map(o => ({
        id: o.OBJECTID,
        provCh: o.Prov_CH,
        cityCh: o.City_CH,
        cityEn: o.City_EN
    })))
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
    let target = cities[req.params.cityId];
    if (target) {
        res.send(target.svgPolygons)
    } else {
        throw 'cityId invalid.'
    }
});

router.get('/:city1/:city2', async function (req, res, next) {

    let city1 = cities[req.params.city1];
    let city2 = cities[req.params.city2];
    if (city1 && city2) {
        res.send(await city1.travelTo(city2));
    } else {
        throw 'cityId invalid.'
    }
});

module.exports = router;

