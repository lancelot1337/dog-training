const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../../models/dog');
const Handler = require('../../models/handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    console.log('/handlers GET logged');
    Handler.find()
        .populate('dog')
        .exec()
        .then(handlers => {
            res.status(200).json({
                count: handlers.length,
                handlers: handlers.map(handler => {
                    return {
                        _id: handler._id,
                        username: handler.username,
                        displayName: handler.displayName,
                        dog: handler.dog,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/handlers/' + handler._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})
router.post('/', (req, res, next) => {
    console.log('/handlers POST logged');
    Dog.findById(req.body.dogId)
        .then(dog => {
            if (!dog) {
                return res.status(404).json({
                    error: "Wrong dog id"
                })
            }
            const handler = new Handler({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                displayName: req.body.displayName,
                dog: req.body.dogId
            });
            return handler
                .save()
        })
        .then(result => {
            res.status(201).json({
                message: "Handler created successfully!"
            });
        })
        .catch(err => {
            error: err
        });
});

router.post('/signup', (req, res, next) => {
    console.log('/handlers/signup POST logged');
    Hander.find({
        email: req.body.email
    })
        .exec()
        .then(handler => {
            if (handler.length > 0) {
                res.status(409).json({
                    message: "Email is already registered, try logging in!"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const handler = new Handler({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        });
                        handler.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Handler created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;