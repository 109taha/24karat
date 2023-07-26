const mongoose = require("mongoose");

const CompletedOrderSchema = mongoose.Schema({
    TaskId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "TaskAssign"
    },
    designerId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "designer"
    },
    Instruction: {
        type: String,
    },
    attachArtwork: {
        type: String,
        require: true,
    },
}, { timestamps: true },
)

const OrderCompleted = mongoose.model("orderCompleted", CompletedOrderSchema);

module.exports = OrderCompleted;