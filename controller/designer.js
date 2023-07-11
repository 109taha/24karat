const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Designer = require("../models/designer");

//user register
const designerRegister = (async (req, res) => {
    try {
        //checking the user axistence
        const user = await Designer.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "designer Already Registered!"
                })
        }

        //hashedpassword
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpassword

        //save user
        const newdesigner = new designer(req.body);
        await newdesigner.save();
        res.status(200).json({
            success: true,
            message: "designer registered successfully!"
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

//designer login
const designerLogin = (async (req, res) => {
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
        const user = await Designer.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "designer Is Not Registered!"
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

//delete designer
const designerDelete = (async (req, res) => {
    try {
        const user = await designer.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send({ success: false, message: "can't find the designer" })
        }
        res.status(200).send({ sucess: true, message: "designer has been delete" });
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = { designerRegister, designerLogin, designerDelete }