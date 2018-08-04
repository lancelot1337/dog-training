const mongoose = require('mongoose');

const healthSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: String,
    pulse: String,
    respiration: String,
    feeding: String,
})

module.exports = mongoose.model('Health', healthSchema)
