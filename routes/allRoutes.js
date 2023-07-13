//route
const router = require("express").Router();


//middlewares
const verifyUser = require("../middleWares/userVerify")
const verifyAdmin = require("../middleWares/adminVerify")
const userSchemaJoi = require("../middleWares/joiMiddleware/userSchemaJoi")
const vactorJoi = require("../middleWares/joiMiddleware/projectSchema/vactorJoi")
const patchesJoi = require("../middleWares/joiMiddleware/projectSchema/patchesJoi")
const graphicsJoi = require("../middleWares/joiMiddleware/projectSchema/graphicsJoi")
const validDesignerSchema = require("../middleWares/joiMiddleware/designerSchemaJoi")
const digitizingJoi = require("../middleWares/joiMiddleware/projectSchema/digitizingJoi")


//controller
const { register, login, deleted } = require("../controller/user");
const { adminRegister, adminlogin } = require("../controller/admin");
const { designerRegister, designerLogin, getAllDesigner, designerDelete } = require("../controller/designer");
const { creatingProjectVector, getUserProjectvector, getAllProjectVector, updatedProjectVector } = require("../controller/projects/vactor");
const { creatingProjectPatches, getUserProjectPatches, getAllProjectPatches, updatedProjectPatches } = require("../controller/projects/patches");
const { creatingProjectGraphices, getUserProjectGraphices, getAllProjectGraphices, updatedProjectGraphices } = require("../controller/projects/graphics");
const { creatingProjectDigitizing, getUserProjectDigitizing, getAllProjectDigitizing, updatedProjectDigitizing } = require("../controller/projects/digitizing");
const { createTask, getTask, getDesinerOrders } = require("../controller/asignTask");
const { createTickets, getTickets, getUserTickets } = require("../controller/tickets");



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
router.post("/designer/Login", designerLogin);
router.delete("/deleteDesigner/:id", designerDelete);
router.get("/getAllDesginer", verifyAdmin, getAllDesigner);
router.post("/designer/Register", validDesignerSchema, verifyAdmin, designerRegister);

//asignTask
router.post("/createTask", verifyAdmin, createTask);
router.get("/getAllTask", verifyAdmin, getTask);
router.get("/getTask/:id", getDesinerOrders)

//tickets
router.post("/createTickets", createTickets);
router.get("/AllTickets", getTickets);
router.get("/UserTickets/:id", getUserTickets)


//project

//digitizing
router.post("/projectDigitizing", digitizingJoi, verifyUser, creatingProjectDigitizing);
router.get("/digitizing/:id", getUserProjectDigitizing);
router.get("/digitizing", verifyAdmin, getAllProjectDigitizing);
// router.put("/updatedigitizing", verifyAdmin, updatedProjectDigitizing);

//Vector
router.post("/projectVector", vactorJoi, verifyUser, creatingProjectVector);
router.get("/Vector/:id", getUserProjectvector);
router.get("/Vector", verifyAdmin, getAllProjectVector);
// router.put("/updatedVector", verifyAdmin, updatedProjectVector);

//Graphices
router.post("/projectGraphices", graphicsJoi, verifyUser, creatingProjectGraphices);
router.get("/Graphices/:id", getUserProjectGraphices);
router.get("/Graphices", verifyAdmin, getAllProjectGraphices);
// router.put("/updatedGraphices", verifyAdmin, updatedProjectGraphices);

//Patches
router.post("/projectPatches", patchesJoi, verifyUser, creatingProjectPatches);
router.get("/Patches/:id", getUserProjectPatches);
router.get("/Patches", verifyAdmin, getAllProjectPatches);
// router.put("/updatedPatches", verifyAdmin, updatedProjectPatches);





module.exports = router;