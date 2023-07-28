const mongoose = require("mongoose");

const orderScheema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        require: true
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    orderType: {
        type: String,
        require: true,
        enum: ["Digitizing", "Graphices", "Vactor"]
    },
    status: {
        type: String,
        require: true,
        enum: ["Pending", "In-Process", "Completed", "Cancelled"],
        default: "Pending"
    }
})

const Order = mongoose.model("Orders", orderScheema);
module.exports = Order