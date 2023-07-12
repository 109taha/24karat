const Patches = require("../../models/projectsSchema/patchesSchema");

const creatingProjectPatches = async (req, res) => {
    try {
        const newProject = new Patches(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        await newProject.save();
        res.status(200).json({ success: true, newProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectPatches = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Patches.find({ userId });
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectPatches = async (req, res) => {
    try {
        const project = await Patches.find()
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};

const updatedProjectPatches = async (req, res) => {
    try {
        const updatedProject = await Patches.findByIdAndUpdate(
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


module.exports = { creatingProjectPatches, getUserProjectPatches, getAllProjectPatches, updatedProjectPatches };