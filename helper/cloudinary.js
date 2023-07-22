const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzvtmtsgj',
    api_key: '347987423714556',
    api_secret: 'C8AnkOEWLWhzCn3vg1ZGN2NyxE8'
});

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
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
module.exports = cloudinary