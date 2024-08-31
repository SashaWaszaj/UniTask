const courseControllers = require('../controllers/course.controller'); 
const express = require('express');
const RouterCourse = express.Router(); 

RouterCourse.post('/new', courseControllers.createCourse); 
RouterCourse.get('/', courseControllers.allCourses); 
RouterCourse.get('/:id', courseControllers.courseById); 
RouterCourse.put('/:id/edit', courseControllers.updateCourse); 
RouterCourse.delete('/delete/:id', courseControllers.deleteCourse); 
module.exports = RouterCourse; 