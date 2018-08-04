const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dogsRoute = require('./api/routes/dogs');
const handlersRoute = require('./api/routes/handlers');
const healthsRoutes = require('./api/routes/healths');
const morgan = require('morgan');

//for mongoose
//const uri = `mongodb://dogtraining:password1@ds159631.mlab.com:59631/dog-training`;
const uri = 'mongodb://localhost:27017/dogtraining'
mongoose.connect(uri, { useNewUrlParser: true })
    .then(result => {
        console.log(`DB connected!`);
    })
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
app.use('/handlers', handlersRoute);
app.use('/healths', healthsRoutes);

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