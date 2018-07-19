const mongoose=require('mongoose');

//blog Schema
const trainingSchema=mongoose.Schema({
	basicObedience: String,
	specialSkills: String,
})

module.exports=mongoose.model('Training' , TrainingSchema)
