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
    JPGFile: {
        type: String,
        require: true,
    },
    SourceFile: {
        type: String,
        require: true,
    },
    Instruction: {
        type: String,
    },
}, { timestamps: true },
)

const OrderCompleted = mongoose.model("orderCompleted", CompletedOrderSchema);
module.exports = OrderCompleted;