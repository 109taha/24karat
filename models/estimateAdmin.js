const mongoose = require("mongoose");

const estimateAdminSchema = new mongoose.Schema(
  {
    EstimateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estimate",
      require: true,
    },
    prices: {
      type: Number,
      require: true,
    },
    timeDuration: {
      type: String,
      require: true,
    },
    accepted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const EsAdmin = mongoose.model("EstimateReply", estimateAdminSchema);

module.exports = EsAdmin;
