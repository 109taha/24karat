const mongoose = require("mongoose");

const PaymentId = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "user"
    },
    designerId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "designer"
    },
    TaskId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "TaskAssign"
    },
    prices: {
        type: Number,
        require: true
    },
    stripe_url: {
        type: String,
        require: true
    },
}, { timestamps: true },
)

const Payment = mongoose.model("paymentInprocess", PaymentId);

module.exports = Payment;