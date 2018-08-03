const mongoose=require('mongoose');

const specialSkillsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	explosive: String,
	tracker: String,
	Assult: String,	
})

module.exports=mongoose.model('SpecialSkills' , specialSkillsSchema)
