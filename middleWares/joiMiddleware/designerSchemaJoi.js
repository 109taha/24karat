const designerSchema = require("../../utils/designerSchemaJoi")

const validDesignerSchema = (req, res, next) => {
    const { error } = designerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error })
    } else {
        next()
    }
}

module.exports = validDesignerSchema