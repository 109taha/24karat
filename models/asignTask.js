const mongoose = require("mongoose");

const AsignTask = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "orders"
    },
    designerId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "designer"
    },
    Instruction: {
        type: String,
    },

}, { timeStamps: true });

const Task = mongoose.model("TaskAssignTo", AsignTask);

module.exports = Task;