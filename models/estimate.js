const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "user",
    },
    DesignName: {
      type: String,
      reqiure: true,
      trim: true,
    },
    Quantity: {
      type: Number,
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
      reqiure: true,
      enum: [
        "Embroidered Patches",
        "Chenille Patches",
        "Enamel Pins",
        "Challenge Coins",
        "Tackle Twill Patches",
        "Applique Patches",
        "Leather Patches",
        "PVC/ Rubber Patches",
        "Printed/ Sublimated Patches",
        "Woven Patches",
        "Sequin Patches",
        "Ebroidered Keychains",
        "Chenille Keychains",
        "Leather Keychains",
        "PVC/ Rubber Keychains",
        "Printed Keychains",
        "Woven Keychains",
        "Face Masks",
        "Costom Socks",
      ],
    },
    designPalcment: {
      type: String,
      reqiure: true,
      enum: [
        "Iron On/ Heat Seal",
        "Velcro (Both Hook & Loop)",
        "Peel & Stick / Self Adhesive",
        "Sew On",
      ],
    },
    timeFrame: {
      type: String,
      require: true,
      enum: [
        "sample: {1-2 days}",
        "normal turn-around: {15-22 days}",
        "urgent turn-around: {8-15 days}",
      ],
    },
    autoThreadCutting: {
      type: String,
      require: true,
      enum: [
        "CUT THREAD LONGER THAN 2 MM",
        "CUT ALL CONNECTION THREADS",
        "DO NOT CUT THREADS",
      ],
    },
    additionalInstructions: {
      type: String,
      require: true,
    },
    attachArtwork: {
      type: String,
    },
    prices: {
      type: Number,
      require: true,
    },
    timeDuration: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Estimate = mongoose.model("Estimate", estimateSchema);

module.exports = Estimate;
