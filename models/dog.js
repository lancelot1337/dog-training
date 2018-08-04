const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: String,
    breed: String,
    gender: String,
    HandlerName: String,
    HandlerId: String,
});

module.exports = mongoose.model('Dog', dogSchema)
