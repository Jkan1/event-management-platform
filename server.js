"use strict"

global.config = require('config');
global.logger = require('./logger/logger');
const express = require('express');
const app = express();

app.set('port', config.get('PORT'));
app.use(express.json());
app.use(function (req, res, next) {
    logger.info(`API ${req.method}${req.url}`);
    next();
});

app.use(function (error, req, res, next) {
    logger.error("Error caught in middleware: ", error);
    if (error) {
        return res.sendStatus(400);
    }
    next();
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-api-key');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Set API Response Header Content-Type to JSON
    res.setHeader('Content-Type', 'application/json');
    // Pass to next layer of middleware
    next();
});

require('./database');

const router = require('./routes/routes');

app.use('/api', router);

(function startInitialProcess() {
    const http = require('http');
    http.createServer(app).listen(app.get('port'), function () {
        logger.info(`Express server listening on Port ${config.get('PORT')}`);
    });
})();

