const Graphics = require("../../models/projectsSchema/graphicsSchema");

const creatingProjectGraphices = async (req, res) => {
    try {
        const newProject = new Graphics(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        await newProject.save();
        res.status(200).json({ success: true, newProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectGraphices = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Graphics.find({ userId });
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectGraphices = async (req, res) => {
    try {
        const project = await Graphics.find()
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};

const updatedProjectGraphices = async (req, res) => {
    try {
        const updatedProject = await Graphics.findByIdAndUpdate(
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


module.exports = { creatingProjectGraphices, getUserProjectGraphices, getAllProjectGraphices, updatedProjectGraphices };