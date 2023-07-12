// const mongoose = require("mongoose");
// const digitizingSchema = require("./projectsSchema/digitizingSchema");
// const patchesSchema = require("./projectsSchema/patchesSchema");
// const graphicsSchema = require("./projectsSchema/graphicsSchema");
// const vertorSchema = require("./projectsSchema/vectorSchema")

// const projectSchema = new mongoose.Schema(
//     {
//         orderType: {
//             type: {
//                 digitizin: { type: digitizingSchema },
//                 patches: { type: patchesSchema },
//                 graphicsDesigner: { type: graphicsSchema },
//                 vectorConversion: { type: vertorSchema }
//             },
//             enum: ["digitizing", "patches", "graphicsDesigner", "vectorConversion"],
//             require: true
//         },
//         orderStatus: {
//             type: String,
//             enum: ["Pending", "Processing", "Ready"],
//             default: ["Pending"]
//         }

//     },
//     { timestamps: true },
// )
// const Project = mongoose.model("Project", projectSchema);

// module.exports = Project;