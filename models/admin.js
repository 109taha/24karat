const mongoose = require("mongoose");

const adminScheema = mongoose.Schema(
    {

        email: {
            type: String,
            trim: true,
            require: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            require: true
        }
    },
)
const Admin = mongoose.model("admin", adminScheema);

module.exports = Admin;