const graphicSchema = require("../../../utils/projectSchemaJoi/GraphicsJoi")

const GraphicsJoi = (req, res, next) => {
    const { error } = graphicSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error })
    } else {
        next()
    }
}

module.exports = GraphicsJoi