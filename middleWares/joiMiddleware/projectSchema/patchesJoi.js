const patchesSchema = require("../../../utils/projectSchemaJoi/PatchesJoi")

const PatchesJoi = (req, res, next) => {
    const { error } = patchesSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error })
    } else {
        next()
    }
}

module.exports = PatchesJoi