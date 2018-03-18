const express = require('express');
const path = require('path');

const helpers = require('./helpers');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
});

app.use('/', routes);

module.exports = app;
