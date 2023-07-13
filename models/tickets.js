const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Order: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "asignTask"
    },
    Subject: {
        type: String,
        require: true,
    },
    Priorty: {
        type: String,
        require: true,
        enum: ["High", "Medium", "Low"]
    },
    Message: {
        type: String,
        require: true,
    }
}, { timestamps: true })

const Tickes = mongoose.model("Tickets", ticketSchema);

module.exports = Tickes