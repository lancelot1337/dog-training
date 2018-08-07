const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Training = require('../../models/training');

router.get('/', (req, res, next) => {
    console.log('/trainings GET logged');
    Training.find()
        .exec()
        .then(trainings => {
            const response = {
                count: trainings.length,
                trainings: trainings.map(training => {
                    return {
                        _id: training._id,
                        basicObedience: training.basicObedience,
                        specialSkills: training.specialSkills,
                        tracker: JSON.parse(training.tracker),
                        explosive: JSON.parse(result.explosive),
                        assault: JSON.parse(result.assault),
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/trainings/' + training._id
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
    const training = new Training({
        _id: new mongoose.Types.ObjectId(),
        basicObedience: req.body.basicObedience,
        specialSkills: req.body.specialSkills,
        tracker: JSON.stringify(req.body.tracker),
        explosive: JSON.stringify(req.body.explosive),
        assault: JSON.stringify(req.body.assault),
    });
    training.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created training successfully",
                createdTraining: {
                    _id: result._id,
                    basicObedience: result.basicObedience,
                    specialSkills: result.specialSkills,
                    tracker: JSON.parse(result.tracker),
                    explosive: JSON.parse(result.explosive),
                    assault: JSON.parse(result.assault),
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/trainings/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;