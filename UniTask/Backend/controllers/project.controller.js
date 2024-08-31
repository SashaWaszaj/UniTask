const Project = require('../model/project.model');

module.exports.createProject = async (req, res) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id });
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        res.status(204).json({ message: "Project successfully deleted." });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getProjectById = (req, res) => {
    Project.findById(req.params.id)
        .then((project) => {
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        });
};

module.exports.updateProject = async (req, res) => {
    try {
        const projectUpdate = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!projectUpdate) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(projectUpdate);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
};