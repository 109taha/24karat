const Digitizing = require("../../models/projectsSchema/digitizingSchema");

const creatingProjectDigitizing = async (req, res) => {
    try {
        const newProject = new Digitizing(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        await newProject.save();
        res.status(200).json({ success: true, newProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectDigitizing = async (req, res) => {
    try {
        const project = await Digitizing.find({ userId });
        console.log(project)
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectDigitizing = async (req, res) => {
    try {
        const project = await Digitizing.find()
        console.log(project)
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};

const updatedProjectDigitizing = async (req, res) => {
    try {
        const updatedProject = await Digitizing.findByIdAndUpdate(
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


module.exports = { creatingProjectDigitizing, getUserProjectDigitizing, getAllProjectDigitizing, updatedProjectDigitizing };