const {
  SSMClient,
  SendCommandCommand,
} = require("@aws-sdk/client-ssm");

const client = new SSMClient({
  region: process.env.AWS_REGION,
});

async function runDockerContainer(instanceId, image, domain) {
  const command = new SendCommandCommand({
    InstanceIds: [instanceId],
    DocumentName: "AWS-RunShellScript",
    Parameters: {
      commands: [
        `
docker pull ${image}

docker run -d \
--name ${domain.replace(/\./g, "-")} \
-p 80:80 \
${image}
        `,
      ],
    },
  });

  return client.send(command);
}

module.exports = {
  runDockerContainer,
};