const influx = require('./utils/influx');
const express = require('express');
let router = express.Router();

router.get('/response/count', function (req, res) {
    influx.query('select count(*) from response_times').then(result => {
        res.json(result);
    }).catch(err => {
        res.send(err);
    })
});

router.get('/response/all', function (req, res) {
    influx.query('select * from response_times').then(result => {
        res.json(result);
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
