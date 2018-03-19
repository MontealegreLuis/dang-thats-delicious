/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const helpers = require('./helpers');
const errorHandlers = require('./handlers/errors');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

app.use('/', routes);
app.use(errorHandlers.flashValidationErrors);

module.exports = app;
