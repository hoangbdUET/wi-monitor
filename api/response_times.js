const influx = require('./utils/influx');
const express = require('express');
const moment = require('moment-timezone');
const convertTime = require('./utils/time-convert');
let router = express.Router();

router.get('/response/count', function (req, res) {
    influx.query('select count(*) from response_times').then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        res.send(err);
    })
});

router.get('/response/all', function (req, res) {
    let whereClause = "";
    let days = req.querys.days || 1;
    if (req.query.username) whereClause += " AND username = '" + req.query.username + "'";
    whereClause += " AND time > now() + " + days + "d";
    let query = "SELECT * FROM response_times WHERE 1=1 " + whereClause;
    console.log(query);
    influx.query(query).then(result => {
        convertTime(result).then(r => {
            res.send(r);
        })
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
