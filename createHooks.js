require("dotenv").config();

const { getPacticipant } = require("./getPacticipant");
const _ = require("lodash");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const JENKINS_USERNAME = process.env.JENKINS_USERNAME;
const JENKINS_USERTOKEN = process.env.JENKINS_USERTOKEN;
const JENKINS_HTTPS_URL = process.env.JENKINS_HTTPS_URL;
const PACT_BROKER_TOKEN = process.env.PACT_BROKER_TOKEN;
const PACT_BROKER_URL = process.env.PACT_BROKER_URL;

const providerMap = {
  "auth-service": ["group-service"],
  frontend: ["gateway"],
  gateway: ["auth-service", "group-service"]
};

async function createWebhook(consumer, provider) {
  const { stdout, stderr } = await exec(`
    pact-broker create-webhook \
    ${JENKINS_HTTPS_URL}/job/${provider}/job/master/buildWithParameters?PACT_VERIFY=true \
    --request=POST \
    --contract-content-changed \
    --consumer=${getPacticipant(consumer)} \
    --provider=${getPacticipant(provider)} \
    --user=${JENKINS_USERNAME}:${JENKINS_USERTOKEN} \
    --broker-base-url="${PACT_BROKER_URL}" \
    --broker-token="${PACT_BROKER_TOKEN}"
  `);
  if (stderr) throw stderr;
  console.log(stdout);
}

(async () => {
  await Promise.all(
    _.flatten(
      Object.entries(providerMap).map(([consumer, providers]) => {
        return providers.map(p => createWebhook(consumer, p));
      })
    )
  );
})();
