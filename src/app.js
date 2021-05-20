require('./db/mongoose');
const express = require('express');
const app = express();

const tollRouter = require('./routers/toll');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(tollRouter);

module.exports = app;