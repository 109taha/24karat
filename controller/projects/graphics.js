const Graphics = require("../../models/projectsSchema/graphicsSchema");
const Order = require("../../models/orderSchema")

const creatingProjectGraphices = async (req, res) => {
    try {
        let newProject = new Graphics(req.body);
        if (!newProject) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newProject.save();

        let newOrder = new Order({ projectId: newProject.id, orderType: "Graphices", status: "Pending" });
        if (!newOrder) {
            res.status(400).send({ success: false, message: "no data found" })
        };
        newProject = await newOrder.save();

        res.status(200).json({ success: true, newOrder });

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