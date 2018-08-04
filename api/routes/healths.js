const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Health = require('../../models/health');

router.get('/', (req, res, next) => {
    console.log('/healths GET logged');
    Health.find()
        .exec()
        .then(results => {
            const response = {
                count: results.length,
                results: results.map(result => {
                    return {
                        _id: result._id,
                        temperature: result.temperature,
                        pulse: result.pulse,
                        respiration: result.respiration,
                        feeding: result.feeding,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/healths/' + health._id
                        }
                    }
                })
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {

});