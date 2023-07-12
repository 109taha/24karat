const digitizingSchema = require("../../../utils/projectSchemaJoi/digitizingJoi")

const digitizingJoi = (req, res, next) => {
    const { error } = digitizingSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error })
    } else {
        next()
    }
}

module.exports = digitizingJoi