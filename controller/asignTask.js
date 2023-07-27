const Task = require("../models/asignTask");
const Designer = require("../models/designer");
const Order = require("../models/orderSchema")
const ProjectRep = require("../models/projectComplete")
const cloudinary = require('../helper/cloudinary')
const fs = require("fs");
const PriceProject = require("../models/priceingProject");
const User = require("../models/user");
const { log } = require("console");
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY)


//create task
const createTask = async (req, res) => {
    try {

        const orderId = await Order.findById(req.body.orderId)
        const update = await orderId.updateOne({ status: "In-Process" })
        if (!orderId) {
            return res.status(400).json({ success: false, message: "No Order Found With Given Id!" })
        }
        const designerId = await Designer.findById(req.body.designerId)
        if (!designerId) {
            return res.status(400).json({ success: false, message: "No Desginer Found With Given Id!" })
        }
        const result = new Task(req.body);
        await result.save()
        res.status(200).json({ success: true, message: "task has been assign to designer ", result })

    } catch (err) {
        res.status(500).json({ success: false, message: "something Went Wrong!" })
    }
}

//OrderCompleted
const projectRep = async (req, res) => {
    const designerId = req.params.id
    const TaskId = await Task.findById(req.body.TaskId)
    try {
        // const update = await orderId.updateOne({ status: "In-Process" })
        if (!TaskId) {
            return res.status(400).json({ success: false, message: "No Task Found With Given Id!" })
        }
        const files = req.files;
        // console.log(files)
        const attachArtwork = [];
        if (!files || files?.length < 1)
            return res.status(401).json({
                success: false,
                message: "You have to upload at least one image to the listing",
            });
        for (const file in files) {

            try {
                const uploader = await cloudinary.uploader.upload(files[file][0].path, { folder: "24-Karat" });
                // console.log("attachArtwork")
                attachArtwork.push({ url: uploader.url });
                fs.unlinkSync(files[file][0].path);
            } catch (err) {
                if (attachArtwork?.length) {
                    const imgs = imgObjs.map((obj) => obj.public_id);
                    cloudinary.api.delete_resources(imgs);
                }
                console.log(err)
            }
        };
        const result = new ProjectRep({ ...req.body, JPGFile: attachArtwork[0].url, SourceFile: attachArtwork[0].url, designerId: designerId });
        console.log(result)
        await result.save()
        res.status(200).json({ success: true, message: "task has been assign to designer ", result })

    } catch (err) {
        res.status(500).json({ success: false, message: "something Went Wrong!" })
    }
}

const adminSendToUser = async (req, res) => {
    try {


        const { prices, instruction, TaskId, orderCompleted } = req.body
        console.log(prices, orderCompleted)
        if (!prices) {
            return res.status(400).send({
                success: false,
                message: "you have to add prices first!"
            })
        }
        const user = await new PriceProject(req.body).populate({ path: 'orderCompleted', populate: { path: 'TaskId', select: 'orderId', populate: { path: 'orderId', select: 'userId', populate: { path: 'userId' } } } })
        console.log(user.orderCompleted.TaskId.orderId.userId)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'no user or order found on that id'
            })
        }

        const userId = user.orderCompleted.TaskId.orderId.userId._id
        console.log(userId)
        const taskId = user.orderCompleted.TaskId._id
        console.log('TaskID:', taskId)
        const Completed = user.orderCompleted._id
        console.log(Completed)
        const result = new PriceProject({ orderCompleted: Completed, TaskId: taskId, userId: userId, prices: prices })
        await result.save()
        // console.log(result);
        res.status(200).send({
            success: true,
            message: 'sended to user',
            result
        })


    } catch (err) {
        res.status(500).send({
            success: false,
            message: "something Went Wrong"
        })
    }
}


//get all task
const getTask = async (req, res) => {
    try {
        const result = await Task.find()
        if (!result.lenght > 0) {
            return res.status(404).snd({ success: false, message: "No Task found!" })
        }
        res.status(200).json({ success: true, result })
    } catch (err) {
        res.status(500).json({ success: false, message: "someThing Went Wrong!" })
    }
}



// get designers only orders
const getDesinerOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const project = await Task.find({});
        if (!project.length > 0) {
            return res.status(404).snd({ success: false, message: "No Task found! on this User" })
        }

        res.status(200).json({ success: true, project });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getTask,
    createTask,
    getDesinerOrders,
    projectRep,
    adminSendToUser,
}