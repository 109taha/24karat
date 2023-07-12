const Vector = require("../../models/projectsSchema/vectorSchema");
const Order = require("../../models/orderSchema")

const creatingProjectVector = async (req, res) => {
    try {
        let newProject = new Vector(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ OrderId: newProject.Id, orderType: "Vactor", status: "Pending" });
        if (!newOrder) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save();

        res.status(200).json({ success: true, newOrder });
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