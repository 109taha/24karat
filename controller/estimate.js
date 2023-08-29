const Estimate = require("../models/estimate");
const EsAdmin = require("../models/estimateAdmin");
const sendEmail = require("../helper/nodeMalier");
const User = require("../models/user");
const cloudinary = require("../helper/cloudinary");
const fs = require("fs");
const Order = require("../models/orderSchema");

// const creatingEstimateRequest = async (req, res) => {
//   const files = req.files;
//   const attachArtwork = [];
//   try {
//     if (!files || files?.length < 1)
//       return res.status(401).json({
//         success: false,
//         message: "You have to upload at least one image to the listing",
//       });
//     for (const file of files) {
//       const { path } = file;
//       try {
//         const uploader = await cloudinary.uploader.upload(path, {
//           folder: "24-Karat",
//         });
//         attachArtwork.push({ url: uploader.url });
//         fs.unlinkSync(path);
//       } catch (err) {
//         if (attachArtwork?.length) {
//           const imgs = imgObjs.map((obj) => obj.public_id);
//           cloudinary.api.delete_resources(imgs);
//         }
//         console.log(err);
//       }
//     }
//     const newEstimate = new Estimate({
//       ...req.body,
//       attachArtwork: attachArtwork[0].url,
//     });
//     console.log(newEstimate);
//     if (!newEstimate) {
//       res.status(404).send({
//         success: false,
//         message: "no data found",
//       });
//     }
//     await newEstimate.save();
//     res.status(200).send({
//       success: true,
//       newEstimate,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "SomeThing Went Wrong!",
//     });
//   }
// };

const estimateDigitizing = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];
  try {
    if (!files || files?.length < 1)
      return res.status(401).json({
        success: false,
        message: "You have to upload at least one image to the listing",
      });
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "24-Karat",
        });
        attachArtwork.push({ url: uploader.url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = imgObjs.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }
    const {
      DesignName,
      NumberOfColors,
      NameOfColors,
      Height,
      Width,
      Unit,
      type,
      designPalcments,
      appliques,
      designFormate,
      timeFrame,
      autoThreadCutting,
      additionalInstructions,
    } = req.body;

    if (
      !DesignName ||
      !NumberOfColors ||
      !NameOfColors ||
      !Height ||
      !Width ||
      !Unit ||
      !type ||
      !designPalcments ||
      !appliques ||
      !designFormate ||
      !timeFrame ||
      !autoThreadCutting ||
      !additionalInstructions ||
      !attachArtwork
    ) {
      return res.status(400).send("Missing required fields.");
    }
    const order = new Estimate({
      userId: req.body.userId,
      orderType: "Digitizing",
      orderDetails: {
        DesignName,
        NumberOfColors,
        NameOfColors,
        Height,
        Width,
        Unit,
        type,
        designPalcments,
        appliques,
        designFormate,
        timeFrame,
        autoThreadCutting,
        additionalInstructions,
        attachArtwork: attachArtwork[0].url,
      },
    });
    await order.save();
    res.status(200).send({ success: true, order });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

const estimateVactor = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];
  try {
    if (!files || files?.length < 1)
      return res.status(401).json({
        success: false,
        message: "You have to upload at least one image to the listing",
      });
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "24-Karat",
        });
        attachArtwork.push({ url: uploader.url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork?.length) {
          const imgs = imgObjs.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }
    const {
      userId,
      DesignName,
      NumberOfColors,
      NameOfColors,
      Height,
      Width,
      Unit,
      whatWillYouUseIfFor,
      colorScheme,
      designPalcments,
      timeFrame,
      additionalInstructions,
    } = req.body;
    if (
      !DesignName ||
      !NumberOfColors ||
      !NameOfColors ||
      !Height ||
      !Width ||
      !Unit ||
      !whatWillYouUseIfFor ||
      !colorScheme ||
      !designPalcments ||
      !timeFrame ||
      !additionalInstructions
    ) {
      return res.status(400).send("Missing required fields.");
    }
    const order = new Estimate({
      userId: req.body.userId,
      orderType: "Vactor",
      orderDetails: {
        DesignName,
        NumberOfColors,
        NameOfColors,
        Height,
        Width,
        Unit,
        whatWillYouUseIfFor,
        colorScheme,
        designPalcments,
        timeFrame,
        additionalInstructions,
        attachArtwork: attachArtwork[0].url,
      },
    });
    await order.save();
    res.status(200).send({ success: true, order });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

const getAllEstimate = async (req, res) => {
  try {
    const allEstimate = await Estimate.find();
    if (!allEstimate > 0) {
      return res.status(404).send({
        success: false,
        message: "no data found",
      });
    }
    res.status(200).send(allEstimate);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "SomeThing Went Wrong!",
    });
  }
};

const AdminResponse = async (req, res) => {
  try {
    // const response = await new EsAdmin(req.body).populate({
    //   path: "EstimateId",
    //   /*select: "DesignName type userId",*/
    // });
    // // const response = await new EsAdmin()
    // console.log(response);
    // if (!response) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "no data found",
    //   });
    // }

    // const requestPerson = await User.find({ _id: response.EstimateId.userId });
    // console.log(requestPerson);
    // const name = requestPerson[0].firstname + " " + requestPerson[0].lastname;
    // const userEmail = requestPerson[0].email;
    // const Id = requestPerson[0]._id;
    // // console.log("name:", name)
    // // console.log("email:", userEmail)
    // // console.log("Id:", Id)
    // const DesignName = response.EstimateId.DesignName;
    // const type = response.EstimateId.type;
    // const prices = response.prices;
    // const timeDuration = response.timeDuration;
    // // console.log(timeDuration)
    // // console.log(prices)
    // // console.log(DesignName)
    // // console.log(type)

    // const mail = sendEmail(
    //   name,
    //   userEmail,
    //   Id,
    //   DesignName,
    //   type,
    //   prices,
    //   timeDuration
    // );
    // // console.log(mail)
    // await response.save();
    // res.status(200).send({
    //   success: true,
    //   response,
    // });
    const { prices, timeDuration } = req.body;
    const estimateId = req.params.Id;
    // console.log(estimateId);
    const estimate = await Estimate.findById(estimateId).populate("userId");
    // console.log(estimate);
    const reply = new EsAdmin({
      EstimateId: req.params.Id,
      prices,
      timeDuration,
    });
    const name = estimate.userId.firstname + " " + estimate.userId.lastname;
    const userEmail = estimate.userId.email;
    const Id = estimate.userId._id;
    const DesignName = estimate.orderDetails.DesignName;
    const type = estimate.orderType;
    // console.log(name, userEmail, Id, DesignName, type);
    const mail = sendEmail(
      name,
      userEmail,
      Id,
      DesignName,
      type,
      prices,
      timeDuration
    );

    await reply.save();
    res.status(200).send({
      success: true,
      reply,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "SomeThing Went Wrong!",
      error,
    });
  }
};

const getAdminRes = async (req, res) => {
  try {
    const estimateId = req.params.Id;
    const estimateRep = await EsAdmin.findById(estimateId);

    if (!estimateRep) {
      return res.status(400).send("NO estimate reply found!");
    }

    res.status(200).send({
      success: true,
      estimateRep,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
};

const ifUserAcceptEstimate = async (req, res) => {
  try {
    const estimateId = req.params.Id;
    const accepted = req.body;
    const estimate = await EsAdmin.findByIdAndUpdate(estimateId, accepted, {
      new: true,
    });
    if (estimate.accepted === false) {
      return res.status(200).send("Hope to see you again");
    } else {
      const order = await Estimate.findById(estimate.EstimateId);
      console.log(order);
      const newOrder = new Order({
        userId: order.userId,
        orderType: order.orderType,
        status: "Pending",
        orderDetails: {
          DesignName: order.orderDetails.DesignName,
          NumberOfColors: order.orderDetails.NumberOfColors,
          NameOfColors: order.orderDetails.NameOfColors,
          Height: order.orderDetails.Height,
          Width: order.orderDetails.Width,
          Unit: order.orderDetails.Unit,
          type: order.orderDetails.type,
          whatWillYouUseIfFor: order.orderDetails.whatWillYouUseIfFor,
          colorScheme: order.orderDetails.colorScheme,
          designPalcments: order.orderDetails.designPalcments,
          appliques: order.orderDetails.appliques,
          designFormate: order.orderDetails.designFormate,
          timeFrame: order.orderDetails.timeFrame,
          autoThreadCutting: order.orderDetails.autoThreadCutting,
          additionalInstructions: order.orderDetails.additionalInstructions,
          attachArtwork: order.orderDetails.attachArtwork,
        },
      });
      newOrder.save();
    }
    return res
      .status(200)
      .send({ success: true, send: "your order is successfully added" });
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  estimateDigitizing,
  getAllEstimate,
  AdminResponse,
  getAdminRes,
  ifUserAcceptEstimate,
  estimateVactor,
};
