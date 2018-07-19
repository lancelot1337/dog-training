const mongoose=require('mongoose');

//blog Schema
const dogSchema=mongoose.Schema({
	name: String,
	age: String,
	breed: String,
	gender: String,
	HandlerName: String,
	HandlerId: String,
})

module.exports=mongoose.model('Dog' , dogSchema)
