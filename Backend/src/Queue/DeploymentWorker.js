const { Worker } = require("bullmq");
const Redis = require("ioredis");

const Deployment = require("../models/Deployment");

const {
  runDockerContainer,
} = require("../services/awsSSMService");

const {
  invokePostDeployLambda,
} = require("../services/lambdaService");

const connection = new Redis(process.env.REDIS_URL);

const worker = new Worker(
  "deployments",
  async (job) => {
    const { deploymentId, image, domain } = job.data;

    try {
      await runDockerContainer(
        process.env.EC2_INSTANCE_ID,
        image,
        domain
      );

      await invokePostDeployLambda({
        deploymentId,
        domain,
      });

      await Deployment.findByIdAndUpdate(deploymentId, {
        status: "Completed",
      });

      global.io.emit("deployment-update", {
        deploymentId,
        status: "Completed",
      });

    } catch (err) {
      console.error(err);

      await Deployment.findByIdAndUpdate(deploymentId, {
        status: "Failed",
        logs: err.message,
      });

      global.io.emit("deployment-update", {
        deploymentId,
        status: "Failed",
      });
    }
  },
  { connection }
);

module.exports = worker;