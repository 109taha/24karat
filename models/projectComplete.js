const mongoose = require("mongoose");

const CompletedOrderSchema = mongoose.Schema({
    TaskId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "orders"
    },
    Instruction: {
        type: String,
    },
    attachArtwork: {
        type: String,
        require: true,
    }
}, { timeStamps: true });

const OrderCompleted = mongoose.model("orderCompleted", CompletedOrderSchema);

module.exports = OrderCompleted;