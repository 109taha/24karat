const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");


//admin register
const adminRegister = (async (req, res) => {
    try {
        //checking the user axistence
        const user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User Already Registered!"
                })
        }

        //hashedpassword
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpassword

        //save user
        const newUser = new Admin(req.body);
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: "something went wrong!"
            });
    }
})

//admin login
const adminlogin = (async (req, res) => {
    try {
        //checking the user info
        const { email, password } = req.body
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Kindly provide a E-mail"
            })
        }
        if (!password) {
            return res.status(401).json({
                success: false,
                message: "Kindly provide an valid password"
            })
        }
        //checking the user axistence
        const user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Is Not Registered!"
            })
        }
        //compareing hashedpassword
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Kindly provide an Valid Password"
            })
        }

        //create a token 
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SEC)

        //login user
        res.status(200).json({
            success: true,
            message: "login successfully",
            user: user, token

        })
    } catch (error) {
        res
            .status(500)
            .send("something went wrong!");
    }
})



module.exports = {
    adminRegister,
    adminlogin,
}