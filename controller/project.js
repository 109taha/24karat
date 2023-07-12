const ProjectSchema = require("../models/project");

const creatingProject = async (req, res) => {
    const newProject = req.body;
    console.log(newProject)
    try {
        const savedProject = await ProjectSchema.save();
        res.status(200).json({ success: true, savedProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProject = async (req, res) => {
    try {
        const project = await ProjectSchema.findById(req.params.id);
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProject = async (req, res) => {
    try {
        const project = await ProjectSchema.find()
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};

const updatedProject = async (req, res) => {
    try {
        const updatedProject = await ProjectSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({ success: true, updatedProject });
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { creatingProject, getUserProject, getAllProject, updatedProject }