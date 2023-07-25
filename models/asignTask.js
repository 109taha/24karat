const mongoose = require("mongoose");

const AsignTask = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Order"
    },
    designerId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Designer"
    },
    Instruction: {
        type: String,
    },

}, { timeStamps: true });

const Task = mongoose.model("TaskAssign", AsignTask);

module.exports = Task;