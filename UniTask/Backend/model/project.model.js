const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert the name of the project.'],
        minLength: [3, 'Please use at least 3 letters for the title.']
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
    dueDate: {
        type: Date,
        required: [true, 'Please insert the due date for the project.'],
    }
      
});

const Project = mongoose.model ("Project", projectSchema);

module.exports = Project;