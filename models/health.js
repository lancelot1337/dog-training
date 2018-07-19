const mongoose=require('mongoose');

//blog Schema
const healthSchema=mongoose.Schema({
	temperature: String,
	pulse: String,
	respiration: String,
	Feeding: String,
})

module.exports=mongoose.model('Health' , healthSchema)
