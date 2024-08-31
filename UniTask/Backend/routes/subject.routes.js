const subjectControllers = require('../controllers/subject.controller');
const express = require('express');
const RouterSubject = express.Router();

RouterSubject.post('/new', subjectControllers.createSubject);
RouterSubject.get('/', subjectControllers.allSubjects);
RouterSubject.delete('/delete/:id', subjectControllers.deleteSubject);
RouterSubject.get('/:id', subjectControllers.getSubjectById);
RouterSubject.put('/:id/edit', subjectControllers.updateSubject);

module.exports = RouterSubject;