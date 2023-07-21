const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.Uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resourse_type: "auto",
            folder: folder
        })
    })
};

module.exports = uploads