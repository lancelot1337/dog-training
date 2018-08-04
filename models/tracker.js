const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    distance: String,
    detected: String,
    type: String,
})

module.exports = mongoose.model('Tracker', trackerSchema)
