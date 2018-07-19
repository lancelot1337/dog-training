const passportLocalMongoose=require('passport-local-mongoose');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	username:{
		type:String,
		unique:'username must be unique',
		required:'username must be mentioned',
	},
	displayName:String,
	handlerPic:String,
	dog:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Dog'
	}],
	salt:String,
	hash:String,

},{timestamp:true})


const crypto=require('crypto');

//one way to save passwords

// userSchema.pre('save', function (next) {
//     var user = this;
//     if (!user.isModified('password')) {return next()};
//     bcrypt.hash(user.password,10).then((hashedPassword) => {
//         user.password = hashedPassword;
//         next();
//     })
// }, function (err) {
//     next(err)
// })


userSchema.methods.setPassword=function(password){
	this.salt=crypto.randomBytes(16).toString('hex')
	this.hash=crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex')
}

userSchema.methods.comparePassword=function(password){
    hash=crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex')
    return hash===this.hash;

}
module.exports=mongoose.model('User ', userSchema);
