const Task = require("../models/asignTask");
const Designer = require("../models/designer");
const Order = require("../models/orderSchema")


//create task
const createTask = async (req, res) => {
    try {

        const orderId = await Order.findById(req.body.orderId)
        console.log(orderId)
        if (!orderId) {
            return res.status(400).json({ success: false, message: "No Order Found With Given Id!" })
        }
        const designerId = await Designer.findById(req.body.designerId)
        console.log(designerId)
        if (!designerId) {
            return res.status(400).json({ success: false, message: "No Desginer Found With Given Id!" })

        }
        const result = new Task(req.body);
        await result.save()
        res.status(200).json({ success: true, message: "task has been assign to designer " })

    } catch (err) {
        res.status(500).json({ success: false, message: "something Went Wrong!" })
    }
}


//get all task
const getTask = async (req, res) => {
    try {
        const result = await Task.find()
        res.status(200).json({ success: true, result })
    } catch (err) {
        res.status(500).json({ success: false, message: "someThing Went Wrong!" })
    }
}



// get designers only orders
const getDesinerOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Task.find({ userId });
        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getTask,
    createTask,
    getDesinerOrders
}