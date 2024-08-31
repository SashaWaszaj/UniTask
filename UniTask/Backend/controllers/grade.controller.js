const Grade = require('../model/grade.model');

module.exports.createGrade = async (req, res) => {
    try {
        const newGrade = await Grade.create(req.body);
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find();
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findOneAndDelete({ _id: req.params.id });
        if (!grade) {
            return res.status(404).json({ message: "Grade not found." });
        }
        res.status(204).json({ message: "Grade successfully deleted." });
    } catch (error) {
        console.error('Error deleting grade:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getGradeById = (req, res) => {
    Grade.findById(req.params.id)
        .then((grade) => {
            if (!grade) {
                return res.status(404).json({ message: 'Grade not found' });
            }
            res.status(200).json(grade);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        });
};

module.exports.updateGrade = async (req, res) => {
    try {
        const gradeUpdate = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!gradeUpdate) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        return res.status(200).json(gradeUpdate);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
};