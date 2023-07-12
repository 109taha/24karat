const Joi = require("joi")

const patchesSchema = Joi.object({
    DesignName: Joi.string()
        .required()
        .min(3)
        .max(40),

    Quantity: Joi.number()
        .required(),

    NumberOfColors: Joi.number()
        .required(),

    NameOfColors: Joi.string()
        .required(),

    Height: Joi.string()
        .required(),

    Width: Joi.string()
        .required(),

    Unit: Joi.string()
        .valid("Inches", "Mm", "Cm")
        .required(),

    type: Joi.string()
        .valid("Embroidered Patches", "Chenille Patches", "Enamel Pins", "Challenge Coins", "Tackle Twill Patches", "Applique Patches", "Leather Patches", "PVC/ Rubber Patches", "Printed/ Sublimated Patches", "Woven Patches", "Sequin Patches", "Ebroidered Keychains", "Chenille Keychains", "Leather Keychains", "PVC/ Rubber Keychains", "Printed Keychains", "Woven Keychains", "Face Masks", "Costom Socks")
        .required(),

    designPalcment: Joi.string()
        .valid("Iron On/ Heat Seal", "Velcro (Both Hook & Loop)", "Peel & Stick / Self Adhesive", "Sew On")
        .required(),

    timeFrame: Joi.string()
        .valid("sample: {1-2 days}", "normal turn-around: {15-22 days}", "urgent turn-around: {8-15 days}")
        .required(),

    autoThreadCutting: Joi.string()
        .valid("CUT THREAD LONGER THAN 2 MM", "CUT ALL CONNECTION THREADS", "DO NOT CUT THREADS")
        .required(),

    additionalInstructions: Joi.string()
        .required(),

    currentStatus: Joi.string()
        .valid("Pending", "InProcess", "commpleted")
        .default("Pending")
        .required(),

}).unknown(true);

module.exports = patchesSchema