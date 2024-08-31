const express = require('express');
const gradeRouter = express.Router();
const gradeControllers = require ('../controllers/grade.controller')

gradeRouter.post('/create', gradeControllers.createGrade);
gradeRouter.get('/', gradeControllers.getAllGrades);
gradeRouter.delete('/delete/:id', gradeControllers.deleteGrade);
gradeRouter.get('/:id', gradeControllers.getGradeById);
gradeRouter.put('/update/:id', gradeControllers.updateGrade);

module.exports = gradeRouter;