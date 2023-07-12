const mongoose = require("mongoose");

const AsignTask = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "project"
    },
    designerId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "designer"
    },
    Instruction: {
        type: String,
    }
}, { timeStamps: true });

const Task = mongoose.Model("TaskAssignTo", AsignTask);

module.exports = Task;