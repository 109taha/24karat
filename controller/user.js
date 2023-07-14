const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//user register
const register = (async (req, res) => {
    try {
        //checking the user axistence
        const user = await User.findOne({ email: req.body.email });
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
        const newUser = new User(req.body);
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

//User login
const login = (async (req, res) => {
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
        const user = await User.findOne({ email: req.body.email });
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

//delete User
const deleted = (async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send({ success: false, message: "can't find the User" })
        }
        res.status(200).send({ sucess: true, message: "User has been delete" });
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = {
    register,
    login,
    deleted
}