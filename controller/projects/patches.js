// const Patches = require("../../models/projectsSchema/patchesSchema");
// const Order = require("../../models/orderSchema")
// const cloudinary = require('../../helper/cloudinary')
// const fs = require("fs");

// const creatingProjectPatches = async (req, res) => {
//     const files = req.files;
//     const attachArtwork = [];
//     try {

//         if (!files || files?.length < 1)
//             return res.status(401).json({
//                 success: false,
//                 message: "You have to upload at least one image to the listing",
//             });
//         for (const file of files) {
//             const { path } = file;
//             try {
//                 const uploader = await cloudinary.uploader.upload(path, { folder: "24-Karat" });
//                 attachArtwork.push({ url: uploader.url });
//                 fs.unlinkSync(path);
//             } catch (err) {
//                 if (attachArtwork?.length) {
//                     const imgs = imgObjs.map((obj) => obj.public_id);
//                     cloudinary.api.delete_resources(imgs);
//                 }
//                 console.log(err)
//             }
//         }
//         let newProject = new Patches(req.body);
//         if (!newProject) {
//             return res.status(400).send({ success: false, message: "no data found" })
//         };
//         newProject = await newProject.save();

//         let newOrder = new Order({ projectId: newProject.id, userId: newProject.userId, orderType: "Patches", status: "Pending" });
//         if (!newOrder) {
//             return res.status(400).send({ success: false, message: "no data found" })
//         };
//         newProject = await newOrder.save()

//         res.status(200).json({ success: true, newOrder });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const getUserProjectPatches = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const project = await Patches.find({ userId });
//         if (!project.length > 0) {
//             return res.status(400).send({ success: false, message: "no Graphics Found!" })
//         }
//         res.status(200).json({ success: true, project });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const getAllProjectPatches = async (req, res) => {
//     try {
//         const project = await Patches.find()
//         if (!project.length > 0) {
//             return res.status(400).send({ success: false, message: "no Graphics Found!" })
//         }
//         res.status(200).json({ success: true, project })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// };



// module.exports = {
//     creatingProjectPatches,
//     getUserProjectPatches,
//     getAllProjectPatches
// };