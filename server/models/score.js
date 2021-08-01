const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    quizid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Score',scoreSchema);

