const Patches = require("../../models/projectsSchema/patchesSchema");
const Order = require("../../models/orderSchema")

const creatingProjectPatches = async (req, res) => {
    try {
        let newProject = new Patches(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ projectId: newProject.id, userId: req.body._id, orderType: "Patches", status: "Pending" });
        if (!newOrder) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save();

        res.status(200).json({ success: true, newOrder });
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



module.exports = {
    creatingProjectPatches,
    getUserProjectPatches,
    getAllProjectPatches
};