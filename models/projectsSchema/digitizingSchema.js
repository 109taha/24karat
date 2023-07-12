const mongoose = require("mongoose");

const digitizingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            require: true,
            ref: "User"
        },
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
            type: Array,
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
        type: {
            type: String,
            reqiure: true,
            enum: ["Fabric/Garments", "Cotton", "Ployester", "Ploy/Cotton Blends", "Polo", "Twill", "Fleece", "Denim", "Knit", "Silk", "Nylon", "Others"],
        },
        designPalcments: {
            type: String,
            reqiure: true,
            enum: ["Cap", "Cap-back", "Cap-front", "Cap-side", "Jacket-back", "Left-chest", "Sleeves", "Other"],
        },
        appliques: {
            type: Boolean,
            require: true,
        },
        designFormate: {
            type: String,
            require: true,
            enum: [
                "Tajima (*.DST)",
                "Melco (*.CND)",
                "Melco (*.EXP)",
                "Deco, Brother, Babylock  (*.PES)",
                "Wilcom (*.EMB)",
                "Wilcom V9 (*.EMB)",
                "Wilcom ESS (*.ESS)",
                "Wilcom ESL (*.ESL)",
                "Wilcom PLauen (*.T10)",
                "Wilcom Saurer (*.T15)",
                "Hiraoka DAT (*.DAT)",
                "Hiraoka VEP (*.VEP)",
                "Saurer SLC (*.SAS)",
                "Time and Space MJD (*.MJD)",
                "Barudan (*.DSB)",
                "ZSK (*.DSZ)",
                "ZSK TC(*.Z??)",
                "Toyota (*.10O)",
                "Barudan (*.U??)",
                "Pfaff (*.KSM)",
                "Happy (*.TAP)",
                "Tajima (*.T01)",
                "Barudan (*.T03)",
                "Zangs (*.T04)",
                "ZSK (*.T05)",
                "Compucon (*.XXX)",
                "Artista Design V4.0 (*.ART)",
                "Artista Design V3.0 (*.ART)",
                "Artista Design V2.0 (*.ART)",
                "Artista Design V1.0 (*.ART)",
                "Explorations Projects (*.ART42)",
                "Explorations Tamplates (*.AMT42)",
                "Janome/Elna/Kenmore (*.SEW)",
                "Janome/Elna/Kenmore (*.JEF)",
                "Husqvarna/Viking (*.HUS)",
                "Deco, Brother, Babylock (*.PEC)",
                "Pfaff (*.PCD)",
                "Pfaff (*.PCQ)",
                "Poem, Huskygram, Singer (*.CSD)",
                "Pxf",
                "Ofm"
            ]
        },
        timeFrame: {
            type: String,
            require: true,
            enum: ["Normal turn-around", "Urgent turn-around: {1-12 hours}, addition 5$"]
        },
        autoThreadCutting: {
            type: String,
            require: true,
            enum: ["CUT THREAD LONGER THAN 2 MM", "CUT ALL CONNECTION THREADS", "DO NOT CUT THREADS"]
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
const Digitizing = mongoose.model("Digitizing", digitizingSchema);

module.exports = Digitizing;