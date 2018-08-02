const mongoose = require('mongoose');

const handlerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: 'username must be unique',
        required: 'username must be mentioned',
    },
    displayName: String,
    dog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog',
    },
}, { timestamp: true });

module.exports = mongoose.model('Handler', handlerSchema)
