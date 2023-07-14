const mongoose = require("mongoose");

const orderScheema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
    },
    orderType: {
        type: String,
        require: true,
        enum: ["Digitizing", "Graphices", "Patches", "Vactor"]
    },
    status: {
        type: String,
        require: true,
        enum: ["Pending", "In-Process", "Completed"],
        default: "Pending"
    }
})

const Order = mongoose.model("Orders", orderScheema);
module.exports = Order