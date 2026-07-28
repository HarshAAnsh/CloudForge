const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema(
  {
    clientName: String,
    domain: String,
    image: String,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    logs: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deployment", deploymentSchema);