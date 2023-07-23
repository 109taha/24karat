const Task = require("../models/asignTask");
const Designer = require("../models/designer");
const Order = require("../models/orderSchema")
const ProjectRep = require("../models/projectComplete")
const cloudinary = require('../helper/cloudinary')
const fs = require("fs");

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
    try {

        const TaskId = await Task.findById(req.body.TaskId)
        // const update = await orderId.updateOne({ status: "In-Process" })
        if (!TaskId) {
            return res.status(400).json({ success: false, message: "No Task Found With Given Id!" })
        }
        const files = req.files;
        const attachArtwork = [];

        if (!files || files?.length < 1)
            return res.status(401).json({
                success: false,
                message: "You have to upload at least one image to the listing",
            });
        for (const file of files) {
            const { path } = file;

            try {
                const uploader = await cloudinary.uploader.upload(path, { folder: "24-Karat" });
                attachArtwork.push({ url: uploader.url });
                fs.unlinkSync(path);
            } catch (err) {
                if (attachArtwork?.length) {
                    const imgs = imgObjs.map((obj) => obj.public_id);
                    cloudinary.api.delete_resources(imgs);
                }
                console.log(err)
            }
        };
        const result = new ProjectRep({ ...req.body, attachArtwork: attachArtwork[0].url });
        await result.save()
        res.status(200).json({ success: true, message: "task has been assign to designer ", result })

    } catch (err) {
        res.status(500).json({ success: false, message: "something Went Wrong!" })
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
}