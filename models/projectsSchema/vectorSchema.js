const mongoose = require("mongoose");

const vertorSchema = mongoose.Schema(
    {
        DesignName: {
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
        Height: {
            type: String,
            reqiure: true,
            trim: true
        },
        Width: {
            type: String,
            reqiure: true,
            trim: true
        },
        Unit: {
            type: String,
            reqiure: true,
            enum: ["Inches", "Mm", "Cm"],
        },
        whatWillYouUseIfFor: {
            type: String,
            reqiure: true,
            enum: ["Screen Printing", "Direct To Garment", "Sublimation", "Vinyl Cutting", "Laser Engraving", "Denim", "Sand Blasting", "Diamond Drag Engraving", "Other"]
        },
        colorScheme: {
            type: String,
            reqiure: true,
            enum: ["Black & White", "Black & White With Halftones", "Spot Color With NO Halftones", "Spot Color With Halftones", "Others"],
        },
        designFormate: {
            type: String,
            require: true,
            enum: [".ai", ".pdf", ".crd", ".eps", ".psd", ".svg", "Other"]
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
const Vector = mongoose.model("vector", vertorSchema);

module.exports = Vector;