const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert the name of the exam.'],
        minLength: [3, 'Please use at least 3 letters for the exam.']
    },
    subject: {
        type: String,
        required: [true, 'Please insert the subject of the exam.'],
        minLength: [3, 'Please use at least 3 letters for the subject.']
    },
    description: {
        type: String,
        required: [false]
    },
    date: {
        type: Date,
        required: [true, 'Please insert the date for the exam.'],
    },
    time: {
        type: String,
        required: [true, 'Please insert the time for the exam.'],
    }
      
});

const Exam = mongoose.model ("Exam", examSchema);

module.exports = Exam;