const mongoose = require("mongoose");

const PriceingProjectSchema = mongoose.Schema({
    TaskId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "TaskAssign"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        require: true
    },
    Instruction: {
        type: String,
    },
    attachArtwork: {
        type: String,
        require: true,
    },
    prices: {
        type: Number,
    }
}, { timeStamps: true });

const princes = mongoose.model("PriceingProject", PriceingProjectSchema);

module.exports = princes;