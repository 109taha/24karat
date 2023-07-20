const Patches = require("../../models/projectsSchema/patchesSchema");
const Order = require("../../models/orderSchema")


const creatingProjectPatches = async (req, res) => {
    try {
        let newProject = new Patches(req.body);
        if (!newProject) {
            return res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ projectId: newProject.id, userId: newProject.userId, orderType: "Patches", status: "Pending" });
        if (!newOrder) {
            return res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save()

        res.status(200).json({ success: true, newOrder });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectPatches = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Patches.find({ userId });
        if (!project.length > 0) {
            return res.status(400).send({ success: false, message: "no Graphics Found!" })
        }
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectPatches = async (req, res) => {
    try {
        const project = await Patches.find()
        if (!project.length > 0) {
            return res.status(400).send({ success: false, message: "no Graphics Found!" })
        }
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