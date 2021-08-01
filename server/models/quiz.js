const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String
});

const quizSchema = new mongoose.Schema({
    creatoruserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },//many to one
    title: String,
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz',quizSchema);

