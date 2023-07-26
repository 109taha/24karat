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
    prices: {
        type: Number,
    }
}, { timestamps: true });

const prices = mongoose.model("PriceingProject", PriceingProjectSchema);

module.exports = prices;