const mongoose=require('mongoose');

//blog Schema
const trackerSchema=mongoose.Schema({
	distance: String,
	detected: String,
	type: String,
})

module.exports=mongoose.model('Tracker Dog' , trackerSchema)
