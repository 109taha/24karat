const Vector = require("../../models/projectsSchema/vectorSchema");

const creatingProjectVector = async (req, res) => {
    try {
        const newProject = new Vector(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        await newProject.save();
        res.status(200).json({ success: true, newProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectvector = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Vector.find({ userId });
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectVector = async (req, res) => {
    try {
        const project = await Vector.find()
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};

const updatedProjectVector = async (req, res) => {
    try {
        const updatedProject = await Vector.findByIdAndUpdate(
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


module.exports = { creatingProjectVector, getUserProjectvector, getAllProjectVector, updatedProjectVector };