const mongoose = require("mongoose");

const orderScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: true,
  },
  orderType: {
    type: String,
    require: true,
    enum: ["Digitizing", "Vactor"],
  },
  status: {
    type: String,
    enum: ["In-process", "Pending", "Completed", "Canceled"],
  },
  orderDetails: {
    DesignName: {
      type: String,
      reqiure: true,
      trim: true,
    },
    NumberOfColors: {
      type: Number,
      reqiure: true,
      trim: true,
    },
    NameOfColors: {
      type: String,
      reqiure: true,
      trim: true,
    },
    Height: {
      type: String,
      reqiure: true,
      trim: true,
    },
    Width: {
      type: String,
      reqiure: true,
      trim: true,
    },
    Unit: {
      type: String,
      reqiure: true,
      enum: ["Inches", "Mm", "Cm"],
    },
    type: {
      type: String,
      enum: [
        "Fabric/Garments",
        "Cotton",
        "Ployester",
        "Ploy/Cotton Blends",
        "Polo",
        "Twill",
        "Fleece",
        "Denim",
        "Knit",
        "Silk",
        "Nylon",
        "Others",
      ],
    },
    whatWillYouUseIfFor: {
      type: String,
      enum: [
        "Screen Printing",
        "Direct To Garment",
        "Sublimation",
        "Vinyl Cutting",
        "Laser Engraving",
        "Denim",
        "Sand Blasting",
        "Diamond Drag Engraving",
        "Other",
      ],
    },
    colorScheme: {
      type: String,
      enum: [
        "Black & White",
        "Black & White With Halftones",
        "Spot Color With NO Halftones",
        "Spot Color With Halftones",
        "Others",
      ],
    },
    designPalcments: {
      type: String,
    },
    appliques: {
      type: Boolean,
      require: true,
    },
    designFormate: {
      type: String,
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
        "Ofm",
      ],
    },
    timeFrame: {
      type: String,
      enum: [
        "Normal turn-around",
        "Urgent turn-around: {1-12 hours}, addition 5$",
      ],
    },
    autoThreadCutting: {
      type: String,
      enum: [
        "CUT THREAD LONGER THAN 2 MM",
        "CUT ALL CONNECTION THREADS",
        "DO NOT CUT THREADS",
      ],
    },
    additionalInstructions: {
      type: String,
    },
    attachArtwork: {
      type: String,
    },
  },
});

const Order = mongoose.model("Orders", orderScheema);
module.exports = Order;
