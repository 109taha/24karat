const Task = require("../models/asignTask");
const Designer = require("../models/designer");
const Order = require("../models/orderSchema")
const ProjectRep = require("../models/projectComplete")
const cloudinary = require('../helper/cloudinary')
const fs = require("fs");
const PriceProject = require("../models/priceingProject");
const User = require("../models/user");
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
    try {
        const designerId = req.params.id
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
        const result = new ProjectRep({ ...req.body, attachArtwork: attachArtwork[0].url, designerId: designerId });
        console.log(result)
        await result.save()
        res.status(200).json({ success: true, message: "task has been assign to designer ", result })

    } catch (err) {
        res.status(500).json({ success: false, message: "something Went Wrong!" })
    }
}

const adminSendToUser = async (req, res) => {
    try {
        const prices = (req.body.prices)
        if (!prices) {
            res.status(400).send({
                success: false,
                message: "you have to add prices first!"
            })
        }
        const task = new PriceProject(req.body)





            .then((renderBuyPage) => {
                res.render('buy', {
                    key: STRIPE_PUBLISHABLE_KEY,
                    amount: prices
                })
            })


            .then((payment) => {
                stripe.customers.create({
                    email: req.body.stripeEmail,
                    source: req.body.stripeToken,
                    name: 'Mirth',
                    address: {
                        line1: '40 W 4th St',
                        postal_code: '10012',
                        city: 'New York',
                        state: 'NY 10012',
                        country: 'USA',
                    }
                })
                    .then((user) => {

                        return stripe.charges.create({
                            amount: prices,     // amount will be amount*100
                            description: "Your Product is ready",
                            currency: 'USD',
                            customer: user.id
                        });
                    })
                    .then((charge) => {
                        res.redirect("/success")
                    })
                    .catch((err) => {
                        res.redirect("/failure")
                    })

            })

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "something Went Wrong"
        })
    }
}


// const createPayment = async (req, res) => {
//     const createPaymentIntent = async (amount, currency) => {
//         try {
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: amount,
//                 currency: currency,
//             });

//             // Return the client secret to the frontend
//             return paymentIntent.client_secret;
//         } catch (err) {
//             console.error('Error creating Payment Intent:', err);
//             throw err;
//         }
//     };
//     const { amount, currency } = req.body;

//     try {
//         const clientSecret = await createPaymentIntent(amount, currency);
//         res.json({ clientSecret });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



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