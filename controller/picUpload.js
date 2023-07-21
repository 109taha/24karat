const cloudinary = require("../helper/cloudinary");
const fs = require("fs");

// const picUpload = async (req, res) => {
//     const uploader = async (path) => await cloudinary.uploads(path, 'Images');
//     if (req.method === 'POST') {
//         const urls = []
//         const files = req.files
//         for (const file of files) {
//             const { path } = file
//             const newPath = await uploader(path)
//             urls.push(newPath)
//             fs.unlinkSync(path)
//         }

//         res.status(200).send({ success: true, message: " images uploaded successfully", data: urls })
//     } else {
//         res.status(500).send({ success: false, error });
//     }
// }
const picUpload = async (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "error"
            })
        }
        res.status(200).json({
            success: true,
            message: "uploaded",
            data: request
        })
    })
}

module.exports = picUpload 