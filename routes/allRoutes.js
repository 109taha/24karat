//route
const router = require("express").Router();

//middlewares
const userSchemaJoi = require("../middleWares/joiMiddleware/userSchemaJoi")
const verifyAdmin = require("../middleWares/adminVerify")
const validDesignerSchema = require("../middleWares/joiMiddleware/designerSchemaJoi")

//controller
const { register, login, deleted } = require("../controller/user");
const { adminRegister, adminlogin } = require("../controller/admin");
const { designerRegister, designerLogin } = require("../controller/designer");


//homepage
router.get("/", (req, res) => {
    res.send("hello world!");
});


//router


//user
router.post("/register", userSchemaJoi, register);
router.post("/login", login);
// router.delete("/delete", deleted)


//admin
router.post("/registerAdmin", adminRegister);
router.post("/loginAdmin", adminlogin);


//designer
router.post("/designer/Register", validDesignerSchema, verifyAdmin, designerRegister);
router.post("/designer/Login", designerLogin);


module.exports = router;