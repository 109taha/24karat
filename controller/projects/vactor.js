const Vector = require("../../models/projectsSchema/vectorSchema");
const Order = require("../../models/orderSchema")


const creatingProjectVector = async (req, res) => {
    try {
        let newProject = new Vector(req.body);
        if (!newProject) {
            return res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ projectId: newProject.id, userId: newProject.userId, orderType: "Vactor", status: "Pending" });
        if (!newOrder) {
            return res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save()

        res.status(200).json({ success: true, newOrder });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserProjectvector = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Vector.find({ userId });
        if (!project.length > 0) {
            return res.status(400).send({ success: false, message: "no Graphics Found!" })
        }
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllProjectVector = async (req, res) => {
    try {
        const project = await Vector.find()
        if (!project.length > 0) {
            return res.status(400).send({ success: false, message: "no Graphics Found!" })
        }
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json(err)
    }
};




module.exports = {
    creatingProjectVector,
    getUserProjectvector,
    getAllProjectVector,
};