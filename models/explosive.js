const mongoose=require('mongoose');

//blog Schema
const explosiveSchema=mongoose.Schema({
	bombsPlanted: String,
	detected: String,
	falseAlert: String,
	missed: String,
})

module.exports=mongoose.model('Explosive Detection Dog' , explosiveSchema)
