var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var ejsRouter = require('./routes/ejs');
const response = require('./utils/response');
const models = require('./models');
const { Op } = require('sequelize');
const session = require('express-session');
var app = express();
require('./config/db');

// Set up session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: new session.MemoryStore({ ttl: 1000 * 60 * 60 * 24 })
}));

var port = process.env.PORT || '3000';
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/', ejsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});