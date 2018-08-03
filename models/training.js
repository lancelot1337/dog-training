const mongoose=require('mongoose');

const trainingSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	basicObedience: String,
	specialSkills: String,
})

module.exports=mongoose.model('Training' , trainingSchema)
