const cloudinary = require('cloudinary').v2; // Make sure to require the cloudinary library and set up the configuration.
const fs = require("fs");

const picUpload = async (req, res) => {
    const uploader = async (path) => await cloudinary.uploader.upload(path, { folder: "Images" }); // Use uploader.upload() method
    if (req.method === 'POST') {
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            try {
                const newPath = await uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path); // Delete the temporary file after successful upload
            } catch (error) {
                console.error("Error uploading file:", error);
                return res.status(500).send({ success: false, error: "Error uploading one or more images." });
            }
        }

        res.status(200).send({ success: true, message: "Images uploaded successfully", data: urls });
    } else {
        res.status(405).send({ success: false, error: "Method Not Allowed" });
    }
}
module.exports = picUpload 