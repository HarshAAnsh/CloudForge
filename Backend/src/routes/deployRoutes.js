const express = require("express");
const router = express.Router();

const Deployment = require("../models/Deployment");
const deploymentQueue = require("../queue/deploymentQueue");

router.post("/deploy", async (req, res) => {
  try {
    const { clientName, domain, image } = req.body;

    const deployment = await Deployment.create({
      clientName,
      domain,
      image,
      status: "Pending",
    });

    await deploymentQueue.add("deploy-job", {
      deploymentId: deployment._id,
      clientName,
      domain,
      image,
    });

    res.status(200).json({
      success: true,
      deploymentId: deployment._id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Deployment request failed",
    });
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.id);

    if (!deployment) {
      return res.status(404).json({
        message: "Deployment not found",
      });
    }

    res.json(deployment);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;