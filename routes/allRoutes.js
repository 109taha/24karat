//route
const router = require("express").Router();

//middlewares
const verifyUser = require("../middleWares/userVerify");
const verifyAdmin = require("../middleWares/adminVerify");
const userSchemaJoi = require("../middleWares/joiMiddleware/userSchemaJoi");
const vactorJoi = require("../middleWares/joiMiddleware/projectSchema/vactorJoi");
const patchesJoi = require("../middleWares/joiMiddleware/projectSchema/patchesJoi");
const graphicsJoi = require("../middleWares/joiMiddleware/projectSchema/graphicsJoi");
const validDesignerSchema = require("../middleWares/joiMiddleware/designerSchemaJoi");
const digitizingJoi = require("../middleWares/joiMiddleware/projectSchema/digitizingJoi");
const upload = require("../helper/multer");

//controller
const { register, login, deleted } = require("../controller/user");
const { adminRegister, adminlogin } = require("../controller/admin");
const {
  createTask,
  getTask,
  getDesinerOrders,
  projectRep,
  adminSendToUser,
} = require("../controller/asignTask");
const {
  createTickets,
  getTickets,
  getUserTickets,
} = require("../controller/tickets");
const {
  designerRegister,
  designerLogin,
  getAllDesigner,
  designerDelete,
} = require("../controller/designer");
const {
  creatingProjectVector,
  getUserProjectvector,
  getAllProjectVector,
} = require("../controller/projects/vactor");
// const { creatingProjectPatches, getUserProjectPatches, getAllProjectPatches, } = require("../controller/projects/patches");
// const {
//   creatingProjectGraphices,
//   getUserProjectGraphices,
//   getAllProjectGraphices,
// } = require("../controller/projects/graphics");
const {
  creatingProjectDigitizing,
  getUserProjectDigitizing,
  getAllProjectDigitizing,
} = require("../controller/projects/digitizing");
const {
  getAllOrder,
  getAllPendingOrder,
  getAllInprocessOrder,
  getAllCompletedOrder,
  getAllcancelledOrder,
  getUserAllOrder,
  CreateVactor,
  CreateDigitizing,
} = require("../controller/order");
const {
  estimateDigitizing,
  getAllEstimate,
  AdminResponse,
  getAdminRes,
  ifUserAcceptEstimate,
  estimateVactor,
} = require("../controller/estimate");
const { userPayment, CompletePayment } = require("../controller/userProject");

//router

//homepage
router.get("/", (req, res) => {
  res.send("hello world! from /v1/ !");
});

//USER
router.post("/login", login);
router.delete("/delete/:id", deleted);
router.post("/register", userSchemaJoi, register);

//ADMIN
router.post("/loginAdmin", adminlogin);
router.post("/registerAdmin", adminRegister);

//DESIGNER
router.post("/designer/Login", designerLogin);
router.delete("/deleteDesigner/:id", designerDelete);
router.get("/getAllDesginer", verifyAdmin, getAllDesigner);
router.post(
  "/designer/Register",
  validDesignerSchema,
  verifyAdmin,
  designerRegister
);

//ASIGN-TASK
router.get("/getTask/:id", getDesinerOrders);
router.get("/getAllTask", verifyAdmin, getTask);
router.post("/createTask", verifyAdmin, createTask);
router.post(
  "/desginerRep/:id",
  upload.fields([
    { name: "JPGFile", maxCount: 1 },
    { name: "SourceFile", maxCount: 1 },
  ]),
  projectRep
);
router.post("/prices", adminSendToUser);

//TICKETS
router.get("/AllTickets", getTickets);
router.post("/createTickets", verifyUser, createTickets);
router.get("/UserTickets/:id", getUserTickets);

//Estimate
router.post("/Response/:Id", verifyAdmin, AdminResponse);
router.get("/AllEstimate", verifyAdmin, getAllEstimate);
router.post(
  "/Estimate/Digitizng",
  upload.array("attachArtwork", 5),
  verifyUser,
  estimateDigitizing
);
router.post(
  "/Estimate/Vactor",
  upload.array("attachArtwork", 5),
  verifyUser,
  estimateVactor
);

router.get("/resAdmin/:Id", getAdminRes);
router.put("/ifUserAccept/:Id", ifUserAcceptEstimate);

// payment
router.post("/paymentuser", userPayment);
router.post("/payment", CompletePayment);

//PROJECTS

//Digitizing
router.get("/digitizing/:id", getUserProjectDigitizing);
router.get("/digitizing", verifyAdmin, getAllProjectDigitizing);
router.post(
  "/projectDigitizing",
  upload.array("attachArtwork", 5),
  digitizingJoi,
  verifyUser,
  creatingProjectDigitizing
);

//Vector
router.get("/Vector/:id", getUserProjectvector);
router.get("/Vector", verifyAdmin, getAllProjectVector);
router.post(
  "/projectVector",
  upload.array("attachArtwork", 5),
  vactorJoi,
  verifyUser,
  creatingProjectVector
);

// //Graphices
// router.get("/Graphices/:id", getUserProjectGraphices);
// router.get("/Graphices", verifyAdmin, getAllProjectGraphices);
// router.post(
//   "/projectGraphices",
//   upload.array("attachArtwork", 5),
//   graphicsJoi,
//   verifyUser,
//   creatingProjectGraphices
// );

// //Patches
// router.get("/Patches/:id", getUserProjectPatches);
// router.get("/Patches", verifyAdmin, getAllProjectPatches);
// router.post("/projectPatches", patchesJoi, verifyUser, creatingProjectPatches);

//orders get by admin
router.post(
  "/CreateVactor",
  upload.array("attachArtwork", 5),
  verifyUser,
  CreateVactor
);
router.post(
  "/CreateDigitizing",
  upload.array("attachArtwork", 5),
  verifyUser,
  CreateDigitizing
);
router.get("/order", verifyAdmin, getAllOrder);
router.get("/pendingOrder", verifyAdmin, getAllPendingOrder);
router.get("/inprocessOrder", verifyAdmin, getAllInprocessOrder);
router.get("/completedOrder", verifyAdmin, getAllCompletedOrder);
router.get("/cancelledOrder", verifyAdmin, getAllcancelledOrder);

//order get by User
router.get("/OrderUser/:id", getUserAllOrder);

module.exports = router;
