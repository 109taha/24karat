// const Task = require("../models/asignTask");
// const Designer = require("../models/designer");

// //get all task
// const getTask = async (req, res) => {
//     try {
//         const result = await Task.find()
//         res.status(200).json({ success: true, result })
//     } catch (err) {
//         res.status(500).json({ success: false, message: "someThing Went Wrong!" })
//     }
// }

// //create task

// const createtask = async (req, res) => {
//     try {
//         const designer = await Designer.findOne({ ObjectId })
//         if (!designer){
//             res.status(400).json({success:false, message: "No Desginer Found!"})
//         }
//         const project = await
//     } catch (err) {
//         res.status(500).json({ success: false, message: "something Went Wrong!" })
//     }
// }