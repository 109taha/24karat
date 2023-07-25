const { number } = require("joi");
const mongoose = require("mongoose");

const CompletedOrderSchema = mongoose.Schema({
    completedOrderId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Order"
    },
    Instruction: {
        type: String,
    },
    attachArtwork: {
        type: String,
        require: true,
    },
    prices: {
        type: Number,
        require: true,
    }

}, { timeStamps: true });

const OrderCompleted = mongoose.model("orderCompleted", CompletedOrderSchema);

module.exports = OrderCompleted;