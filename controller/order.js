const Order = require("../models/orderSchema");

const getAllCompletedOrder = async (req, res, next) => {
    try {
        const order = await Order.find({ status: "Completed" })
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no Completed order found!" });
        }
        res.send({
            total: order.length,
            message: 'Order Fetched Successfully',
            status: 200,
            data: order
        })
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllInprocessOrder = async (req, res) => {
    try {
        const order = await Order.find({ status: "In-Process" })
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no In-Process order found!" });
        }
        res.status(200).send({ success: false, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllPendingOrder = async (req, res) => {
    try {
        const order = await Order.find({ status: "Pending" })
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no Pending order found!" });
        }
        res.status(200).send({ success: false, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const order = await Order.find()
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no order found!" });
        }
        res.status(200).send({ success: false, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllcancelledOrder = async (req, res) => {
    try {
        const order = await Order.find({ status: "Cancelled" })
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no Cancelled order found!" });
        }
        res.status(200).send({ success: false, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};



const getUserAllOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        const order = await Order.find({ userId })
        if (!order.length > 0) {
            return res.status(404).send({ success: false, message: "no order found!" });
        }
        res.status(200).send({ success: true, order });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};


module.exports = {
    getAllCompletedOrder,
    getAllInprocessOrder,
    getAllPendingOrder,
    getAllOrder,
    getAllcancelledOrder,
    getUserAllOrder
}