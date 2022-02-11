'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 查询 Todo 列表
router.get('/', function (req, res, next) {
    res.send('Echo service running');
});

// 新增 Todo 项目
router.post('/', function (req, res, next) {
    var content = req.body.content;
    res.send(content);
});

module.exports = router;
