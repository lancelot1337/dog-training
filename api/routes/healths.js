const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Health = require('../../models/health');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	console.log('/trainings GET logged');
	Health.find()
		.exec()
		.then(healths => {
			const response = {
				count: healths.length,
				healths: healths.map(health => {
					return {
						_id: health._id,
						temperature: health.temperature,
						pulse: health.pulse,
						respiration: health.respiration,
						feeding: health.feeding,
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

router.get('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    Health.findById(id)
        .exec()
        .then(health => {
            if(!health){
                return res.status(404).json({
                    message: "Health not found"
                })
            }
            res.status(200).json({
                health: health,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/healths/`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', checkAuth, (req, res, next) => {
	const health = new Health({
		_id: new mongoose.Types.ObjectId(),
		temperature: req.body.temperature,
		pulse: req.body.pulse,
		respiration: req.body.respiration,
		feeding: req.body.feeding,
	});
	health.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "Created health successfully",
				createdHealth: {
					_id: result._id,
					temperature: result.temperature,
					pulse: result.pulse,
					respiration: result.respiration,
					feeding: result.feeding,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/healths/' + result._id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.delete('/:id', checkAuth, (req, res, next) => {
	console.log('/:id DELETE logged');
	Health.remove({
		_id: req.params.id
	})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Health deleted"
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
})
module.exports = router;