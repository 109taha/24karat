const vactorSchema = require("../../../utils/projectSchemaJoi/vectorJoi")

const vactorJoi = (req, res, next) => {
    const { error } = vactorSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error })
    } else {
        next()
    }
}

module.exports = vactorJoi