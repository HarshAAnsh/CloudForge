const { Queue } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis(process.env.REDIS_URL);

const deploymentQueue = new Queue("deployments", {
  connection,
});

module.exports = deploymentQueue;