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

    type: Joi.string()
        .valid("Fabric/Garments", "Cotton", "Ployester", "Ploy/Cotton Blends", "Polo", "Twill", "Fleece", "Denim", "Knit", "Silk", "Nylon", "Others")
        .required(),

    designPalcments: Joi.string()
        .valid("Cap", "Cap-back", "Cap-front", "Cap-side", "Jacket-back", "Left-chest", "Sleeves", "Other")
        .required(),

    appliques: Joi.boolean()
        .required(),

    designFormate: Joi.string()
        .valid("Tajima (*.DST)",
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
            "Ofm")
        .required(),

    timeFrame: Joi.string()
        .valid("Normal turn-around", "Urgent turn-around: {1-12 hours}, addition 5$")
        .required(),

    autoThreadCutting: Joi.string()
        .valid("CUT THREAD LONGER THAN 2 MM", "CUT ALL CONNECTION THREADS", "DO NOT CUT THREADS")
        .required(),

    additionalInstructions: Joi.string()
        .required(),

    attachArtwork: Joi.string(),

}).unknown(false);

module.exports = degitizingSchema