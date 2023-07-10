const mongoose = require("mongoose");
const digitizingSchema = require("./projectsSchema/digitizingSchema");
const patchesSchema = require("./projectsSchema/patchesSchema");
const graphicsSchema = require("./projectsSchema/graphicsSchema");
const vectorSchema = require("./projectsSchema/vectorSchema")

const projectSchema = mongoose.Schema(
    {
        orderType: {
            digitizing: { type: digitizingSchema },
            patches: { type: patchesSchema },
            graphicsDesigner: { type: graphicsSchema },
            vectorConversion: { type: vectorSchema }
        }
    },
    { timestamps: true },
)
const Admin = mongoose.model("admin", projectSchema);

module.exports = Admin;