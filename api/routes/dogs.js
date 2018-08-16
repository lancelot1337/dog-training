const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../../models/dog')
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	console.log('/dogs GET logged');
	Dog.find()
		.exec()
		.then(dogs => {
			const response = {
				count: dogs.length,
				dogs: dogs.map(dog => {
					return {
						_id: dog._id,
						name: dog.name,
						age: dog.age,
						breed: dog.breed,
						gender: dog.gender,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/dogs/' + dog._id
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
	Dog.findById(id)
		.exec()
		.then(dog => {
			if(!dog){
				return res.status(404).json({
					message: "Dog not found"
				})
			}
			res.status(200).json({
				dog: dog,
				request: {
					type: 'GET',
					url: `http://localhost:3000/dogs/`
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
	const dog = new Dog({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		age: req.body.age,
		breed: req.body.breed,
		gender: req.body.gender,
	});
	dog.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "Created dog successfully",
				createdDog: {
					_id: result._id,
					name: result.name,
					age: result.age,
					breed: result.breed,
					gender: result.gender,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/dogs/' + result._id
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
	Dog.remove({
		_id: req.params.id
	})
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Dog deleted"
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
})

module.exports = router;