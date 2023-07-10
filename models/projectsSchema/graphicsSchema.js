const mongoose = require("mongoose");

const graphicsSchema = mongoose.Schema(
    {
        DesignIdea: {
            type: String,
            reqiure: true,
            trim: true
        },
        NumberOfColor: {
            type: Number,
            reqiure: true,
            trim: true
        },
        NameOfColor: {
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
            type: File,
        }
    },
    { timestamps: true },
)
const Graphics = mongoose.model("graphics", graphicsSchema);

module.exports = Graphics;