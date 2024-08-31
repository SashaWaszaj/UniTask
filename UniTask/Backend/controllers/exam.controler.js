const Exam = require('../model/exam.model');

module.exports.createExam = async (req, res) => {
    try {
        const newExam = await Exam.create(req.body);
        res.status(201).json(newExam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findOneAndDelete({ _id: req.params.id });
        if (!exam) {
            return res.status(404).json({ message: "Exam not found." });
        }
        res.status(204).json({ message: "Exam successfully deleted." });
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllExamById = (req, res) => {
    Exam.findById(req.params.id)
        .then((exam) => {
            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }
            res.status(200).json(exam);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json(error.message);
        });
};

module.exports.updateExam = async (req, res) => {
    try {
        const examUpdate = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!examUpdate) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        return res.status(200).json(examUpdate);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
};