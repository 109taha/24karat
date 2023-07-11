const Joi = require("joi")

const userSchema = Joi.object({
    firstname: Joi.string()
        .required()
        .min(3)
        .max(40),

    lastname: Joi.string()
        .required()
        .min(3)
        .max(40),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(7)
        .max(70)
        .required(),

    address: Joi.string()
        .required(),

    city: Joi.string()
        .required(),

    country: Joi.string()
        .required(),

    phone: Joi.number()
        .min(10)
        .required(),

}).unknown(true);

module.exports = userSchema