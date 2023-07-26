const mongoose = require("mongoose");

const graphicsSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            require: true,
            ref: "user"
        },
        DesignIdea: {
            type: String,
            reqiure: true,
            trim: true
        },
        NumberOfColors: {
            type: Number,
            reqiure: true,
            trim: true
        },
        NameOfColors: {
            type: String,
            reqiure: true,
            trim: true
        },
        type: {
            type: String,
            reqiure: true,
            enum: ["Logo", "Banner", "Visiting Card", "Letter Head", "Stationery", "Penaflex", "Other"],
        },
        timeFrame: {
            type: String,
            require: true,
            enum: ["normal turn-around", "urgent turn-around: {1-12 hours}, addition 5$"]
        },
        additionalInstructions: {
            type: String,
            require: true,
        },
        attachArtwork: {
            type: String,
        }
    },
    { timestamps: true },
)
const Graphics = mongoose.model("Graphics Designing", graphicsSchema);

module.exports = Graphics;