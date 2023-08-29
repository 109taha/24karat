const mongoose = require("mongoose");

const userScheema = mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      require: true,
    },
    lastname: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    address: {
      type: String,
      trim: true,
      require: true,
    },
    city: {
      type: String,
      trim: true,
      require: true,
    },
    country: {
      type: String,
      trim: true,
      require: true,
    },
    postelCode: {
      type: String,
      trim: true,
      require: true,
    },
    phone: {
      type: Number,
      trim: true,
      require: true,
    },
    ref_counter: {
      order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
      total: { type: String },
      totalUse: { type: String },
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userScheema);

module.exports = User;
