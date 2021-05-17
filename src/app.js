require('./db/mongoose');
const express = require('express');
const app = express();

const tollRouter = require('./routers/toll');

app.use(express.json());
app.use(tollRouter);

module.exports = app;