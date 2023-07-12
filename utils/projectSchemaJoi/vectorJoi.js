const Joi = require("joi")

const degitizingSchema = Joi.object({
    DesignName: Joi.string()
        .required()
        .min(3)
        .max(40),

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

    whatWillYouUseIfFor: Joi.string()
        .valid("Screen Printing", "Direct To Garment", "Sublimation", "Vinyl Cutting", "Laser Engraving", "Denim", "Sand Blasting", "Diamond Drag Engraving", "Other")
        .required(),

    colorScheme: Joi.string()
        .valid("Black & White", "Black & White With Halftones", "Spot Color With NO Halftones", "Spot Color With Halftones", "Others")
        .required(),

    designFormate: Joi.string()
        .valid(".ai", ".pdf", ".crd", ".eps", ".psd", ".svg", "Other")
        .required(),

    timeFrame: Joi.string()
        .valid("Normal turn-around", "Urgent turn-around: {1-12 hours}, addition 5$")
        .required(),

    additionalInstructions: Joi.string()
        .required(),

    currentStatus: Joi.string()
        .valid("Pending", "InProcess", "commpleted")
        .default("Pending")
        .required(),

}).unknown(true);

module.exports = degitizingSchema