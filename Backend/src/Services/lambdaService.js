const {
  LambdaClient,
  InvokeCommand,
} = require("@aws-sdk/client-lambda");

const client = new LambdaClient({
  region: process.env.AWS_REGION,
});

async function invokePostDeployLambda(payload) {
  const command = new InvokeCommand({
    FunctionName: process.env.POST_DEPLOY_LAMBDA,
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  return client.send(command);
}

module.exports = {
  invokePostDeployLambda,
};