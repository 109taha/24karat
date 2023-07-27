const priceingProject = require("../models/priceingProject");
const ProjectReq = require('../models/projectComplete')
const PaymentSuccess = require("../models/paymentInprocess")
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY)


const userPayment = async (req, res) => {
    try {

        const { project } = req.body
        const price = await priceingProject.find({ _id: project })
        const prices = price[0].prices;
        // console.log(prices)

        const userID = await priceingProject.find({ _id: project }).populate({ path: 'TaskId', populate: { path: 'orderId', populate: { path: 'userId' } } })
        const user = userID[0].TaskId.orderId.userId._id
        const email = userID[0].TaskId.orderId.userId.email
        const productType = userID[0].TaskId.orderId.orderType
        const taskID = userID[0].TaskId._id
        // console.log(taskID)
        // console.log('User:', email)

        // const designerId = await priceingProject.find({ _id: project }).populate('TaskId')
        const designer = userID[0].TaskId.designerId._id
        // console.log('Designer:', designer)

        const source = await priceingProject.find({ _id: project }).populate({ path: 'orderCompleted', select: 'SourceFile' })
        const SourceFile = source[0].orderCompleted.SourceFile
        // console.log(SourceFile)


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productType,
                        },
                        unit_amount: prices * 100,
                    },
                    quantity: 1,
                },
            ],
            customer_email: email,
            mode: 'payment',
            success_url: 'https://geekslogicity.com/success?session_id={CHECKOUT_SESSION_ID}', // Replace with your success URL
            cancel_url: 'https://your-website.com/cancel', // Replace with your cancel URL
        });
        console.log(session)
        const Stripe_url = session.url;

        const result = new PaymentSuccess({ userId: user, designerId: designer, TaskId: taskID, prices: prices, stripe_url: Stripe_url })
        await result.save();
        res.status(200).send({
            success: true,
            message: "payment added successfully",
            Stripe_url
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    userPayment
}