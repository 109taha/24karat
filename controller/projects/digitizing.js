const digitizingJoi = require("../../middleWares/joiMiddleware/projectSchema/digitizingJoi");
const Digitizing = require("../../models/projectsSchema/digitizingSchema");
const Order = require("../../models/orderSchema.js")



const creatingProjectDigitizing = async (req, res) => {
    try {
        let newProject = new Digitizing(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ projectId: newProject.id, orderType: "Digitizing", status: "Pending" });
        if (!newOrder) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save();

        res.status(200).json({ success: true, newOrder });

    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectDigitizing = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Digitizing.find({ userId });
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectDigitizing = async (req, res) => {
    try {
        const project = await Digitizing.find()
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


module.exports = {
    creatingProjectDigitizing,
    getUserProjectDigitizing,
    updatedProjectDigitizing,
    getAllProjectDigitizing
};