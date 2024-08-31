const express = require('express');
const projectRouter = express.Router();
const userControllers = require('../controllers/user.controllers');
const projectControllers = require ('../controllers/project.controller')

projectRouter.post('/register', userControllers.addUser )
projectRouter.post('/login', userControllers.loginUser);
projectRouter.post('/create', projectControllers.createProject);
projectRouter.get('/', projectControllers.getAllProjects);
projectRouter.delete('/delete/:id', projectControllers.deleteProject);
projectRouter.get('/:id', projectControllers.getProjectById);
projectRouter.put('/update/:id', projectControllers.updateProject);

module.exports = projectRouter;