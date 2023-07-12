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
const { creatingProjectDigitizing, getUserProjectDigitizing, getAllProjectDigitizing, updatedProjectDigitizing } = require("../controller/projects/digitizing");
const { creatingProjectVector, getUserProjectvector, getAllProjectVector, updatedProjectVector } = require("../controller/projects/vactor");
const { creatingProjectGraphices, getUserProjectGraphices, getAllProjectGraphices, updatedProjectGraphices } = require("../controller/projects/graphics");
const { creatingProjectPatches, getUserProjectPatches, getAllProjectPatches, updatedProjectPatches } = require("../controller/projects/patches");


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
router.get("/digitizing", verifyAdmin, getAllProjectDigitizing);
// router.put("/updatedigitizing", verifyAdmin, updatedProjectDigitizing);

//Vector
router.post("/projectVector", verifyUser, creatingProjectVector);
router.get("/Vector/:id", getUserProjectvector);
router.get("/Vector", verifyAdmin, getAllProjectVector);
// router.put("/updatedVector", verifyAdmin, updatedProjectVector);

//Graphices
router.post("/projectGraphices", verifyUser, creatingProjectGraphices);
router.get("/Graphices/:id", getUserProjectGraphices);
router.get("/Graphices", verifyAdmin, getAllProjectGraphices);
// router.put("/updatedGraphices", verifyAdmin, updatedProjectGraphices);

//Patches
router.post("/projectPatches", verifyUser, creatingProjectPatches);
router.get("/Patches/:id", getUserProjectPatches);
router.get("/Patches", verifyAdmin, getAllProjectPatches);
// router.put("/updatedPatches", verifyAdmin, updatedProjectPatches);

module.exports = router;