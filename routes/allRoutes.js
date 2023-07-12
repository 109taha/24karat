//route
const router = require("express").Router();


//middlewares
const verifyUser = require("../middleWares/userVerify")
const verifyAdmin = require("../middleWares/adminVerify")
const userSchemaJoi = require("../middleWares/joiMiddleware/userSchemaJoi")
const validDesignerSchema = require("../middleWares/joiMiddleware/designerSchemaJoi")


//controller
const { register, login, deleted } = require("../controller/user");
const { adminRegister, adminlogin } = require("../controller/admin");
const { designerRegister, designerLogin, getAllDesigner, designerDelete } = require("../controller/designer");
const { creatingProject, getUserProject, getAllProject, updatedProject } = require("../controller/project");
const { creatingProjectDigitizing, getUserProjectDigitizing, getAllProjectDigitizing, updatedProjectDigitizing } = require("../controller/projects/digitizing")


//router

//homepage
router.get("/", (req, res) => {
    res.send("hello world!");
});


//user
router.post("/register", userSchemaJoi, register);
router.post("/login", login);
router.delete("/delete/:id", deleted);


//admin
router.post("/registerAdmin", adminRegister);
router.post("/loginAdmin", adminlogin);


//designer
router.post("/designer/Register", validDesignerSchema, verifyAdmin, designerRegister);
router.post("/designer/Login", designerLogin);
router.delete("/deleteDesigner/:id", designerDelete);
router.get("/getAllDesginer", verifyAdmin, getAllDesigner);


//project

//digitizing
router.post("/projectDigitizing", verifyUser, creatingProjectDigitizing);
router.get("/digitizing/:id", getUserProjectDigitizing);
router.get("/getAllProjectdigitizing", verifyAdmin, getAllProjectDigitizing);
router.put("/updatedigitizing", verifyAdmin, updatedProjectDigitizing);


module.exports = router;