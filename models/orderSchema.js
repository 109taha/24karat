// {
//     `orderid`,
//     'ordertype',
//     'status'
// }

const mongoose = require("mongoose");

const orderScheema = new mongoose.Schema({
    OrderId: {
        type: mongoose.Schema.ObjectId,
    },
    orderType: {
        type: String,
        enum: ["Digitizing", "Graphices", "Patches", "Vactor"]
    },
    status: {
        type: String,
        enum: ["Pending", "In-Process", "Completed"],
        default: "Pending"
    }
})

const Order = mongoose.model("Orders", orderScheema);
module.exports = Order