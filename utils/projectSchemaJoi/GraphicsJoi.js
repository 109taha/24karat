const Joi = require("joi")

const graphicsSchema = Joi.object({
    DesignIdea: Joi.string()
        .required()
        .min(3)
        .max(40),

    NumberOfColors: Joi.number()
        .required(),

    NameOfColors: Joi.string()
        .required(),

    type: Joi.string()
        .valid("Logo", "Banner", "Visiting Card", "Letter Head", "Stationery", "Penaflex", "Other")
        .required(),

    timeFrame: Joi.string()
        .valid("normal turn-around", "urgent turn-around: {1-12 hours}, addition 5$")
        .required(),

    additionalInstructions: Joi.string()
        .required(),


    attachArtwork: Joi.string(),


}).unknown(true);

module.exports = graphicsSchema