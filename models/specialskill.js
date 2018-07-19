const mongoose=require('mongoose');

//blog Schema
const specialSkillsSchema=mongoose.Schema({
	explosive: String,
	tracker: String,
	Assult: String,	
})

module.exports=mongoose.model('Special Skills' , specialSkillsSchema)
