const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the subject.']
    },
    professor: {
        type: String,
        required: [true, 'Please enter the name of the professor.']
    },
    semester: {
        type: String,
        required: [true, 'Please enter the corresponding semester.']
    },
    day: {
        type: String,
        required: [true, 'Please enter the day of the week the subject is held.']
    },
    startTime: {
        type: String,
        required: [true, 'Please enter the start time.']
    },
    endTime: {
        type: String,
        required: [true, 'Please enter the end time.'],
    }
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;