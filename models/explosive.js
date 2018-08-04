const mongoose = require('mongoose');

const explosiveSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bombsPlanted: String,
    detected: String,
    falseAlert: String,
    missed: String,
})

module.exports = mongoose.model('Explosive', explosiveSchema)
