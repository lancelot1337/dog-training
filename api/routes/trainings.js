const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Training = require('../../models/training');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
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
                        specialSkillsInfo: JSON.parse(training.specialSkillsInfo),
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

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Training.findById(id)
        .exec()
        .then(training => {
            if(!training){
                return res.status(404).json({
                    message: "Training not found"
                })
            }
            res.status(200).json({
                training: training,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/trainings/`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', (req, res, next) => {
    const training = new Training({
        _id: new mongoose.Types.ObjectId(),
        basicObedience: req.body.basicObedience,
        specialSkills: req.body.specialSkills,
        specialSkillsInfo: JSON.stringify(req.body.specialSkillsInfo)
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
                    specialSkillsInfo: JSON.parse(result.specialSkillsInfo),
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

router.delete('/:id', (req, res, next) => {
    console.log('/:id DELETE logged');
    Training.remove({
        _id: req.params.id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Training deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;