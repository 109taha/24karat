const mongoose = require("mongoose");

const PaymentId = mongoose.Schema({
    payment: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "paymentInprocess"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "user"
    },
    TaskId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "TaskAssign"
    },
    paymentStatus: {
        type: Boolean,
        require: true,
        default: false
    },
    session_id: {
        type: String,
        require: true
    },
}, { timestamps: true },
)

const Payment = mongoose.model("paymentCompleted", PaymentId);

module.exports = Payment;