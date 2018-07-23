const express = require('express');
const app = express();
const http = require('http');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

let responseTimeRouter = require('./api/response_times');

app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use('/', responseTimeRouter);
app.use('/', (req, res) => {
    res.send("I2g's Monitoring Service");
});

http.createServer(app).listen(config.app.port, () => {
    console.log("Monitoring service listening on port ", config.app.port);
});