const Order = require("../models/orderSchema");

const CreateDigitizing = async (req, res) => {
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
    const order = new Order({
      userId: req.body.userId,
      orderType: "Digitizing",
      status: "Pending",
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

const CreateVactor = async (req, res) => {
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
    const order = new Order({
      userId: req.body.userId,
      orderType: "Vactor",
      status: "Pending",
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

const getAllCompletedOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ status: "Completed" });
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no Completed order found!" });
    }
    res.send({
      total: order.length,
      message: "Order Fetched Successfully",
      status: 200,
      data: order,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

const getAllInprocessOrder = async (req, res) => {
  try {
    const order = await Order.find({ status: "In-Process" });
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no In-Process order found!" });
    }
    res.status(200).send({ success: false, order });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

const getAllPendingOrder = async (req, res) => {
  try {
    const order = await Order.find({ status: "Pending" });
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no Pending order found!" });
    }
    res.status(200).send({ success: false, order });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no order found!" });
    }
    res.status(200).send({ success: false, order });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

const getAllcancelledOrder = async (req, res) => {
  try {
    const order = await Order.find({ status: "Cancelled" });
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no Cancelled order found!" });
    }
    res.status(200).send({ success: false, order });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

const getUserAllOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const order = await Order.find({ userId });
    if (!order.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "no order found!" });
    }
    res.status(200).send({ success: true, order });
  } catch (err) {
    res.status(500).send({ success: false, message: "SomeThing Went Wrong!" });
  }
};

module.exports = {
  CreateVactor,
  CreateDigitizing,
  getAllCompletedOrder,
  getAllInprocessOrder,
  getAllPendingOrder,
  getAllOrder,
  getAllcancelledOrder,
  getUserAllOrder,
};
