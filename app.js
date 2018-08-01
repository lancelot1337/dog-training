const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dogsRoute = require('./api/routes/dogs');
const morgan = require('morgan');

//for mongoose
//const uri = `mongodb://dogtraining:password1@ds159631.mlab.com:59631/dog-training`;
const uri = 'mongodb://localhost/dogtraining'
mongoose.connect(uri)
    .then((result => {
        console.log(`DB connected!`);
    }))
    .catch(err => {
        console.log(`DB failed to connect, error: ${err}`);
    });

//mongoose.Promise = global.Promise;

//for logging
app.use(morgan('dev'));

//for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes to controller
app.use('/dogs', dogsRoute);

//for error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;