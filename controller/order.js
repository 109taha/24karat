const Order = require("../models/orderSchema");

const getAllCompletedOrder = async (req, res) => {
    try {
        const completed = await Order.find({ status: "Completed" })
        if (!completed) {
            res.status(500).send({ success: false, message: "no completed order found!" });
        }
        res.status(200).send({ success: false, completed });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllInprocessOrder = async (req, res) => {
    try {
        const completed = await Order.find({ status: "In-Process" })
        if (!completed) {
            res.status(500).send({ success: false, message: "no In-Process order found!" });
        }
        res.status(200).send({ success: false, completed });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllPendingOrder = async (req, res) => {
    try {
        const completed = await Order.find({ status: "Pending" })
        if (!completed) {
            res.status(500).send({ success: false, message: "no Pending order found!" });
        }
        res.status(200).send({ success: false, completed });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const completed = await Order.find()
        if (!completed) {
            res.status(500).send({ success: false, message: "no order found!" });
        }
        res.status(200).send({ success: false, completed });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};

const getAllcancelledOrder = async (req, res) => {
    try {
        const completed = await Order.find({ status: "Cancelled" })
        if (!completed) {
            res.status(500).send({ success: false, message: "no Cancelled order found!" });
        }
        res.status(200).send({ success: false, completed });
    } catch (err) {
        res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
    }
};



module.exports = {
    getAllCompletedOrder,
    getAllInprocessOrder,
    getAllPendingOrder,
    getAllOrder,
    getAllcancelledOrder
}