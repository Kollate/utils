require("dotenv").config();
const path = require("path");
const { getPacticipant } = require("./getPacticipant");
const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");
const pact = require("@pact-foundation/pact-node");

exports.canIDeploy = function({
  kustomizeFile,
  retryTimes,
  retryInterval,
  brokerUrl,
  brokerToken
  // verbose
}) {
  const yamlFile = path.resolve(kustomizeFile);
  const doc = yaml.safeLoad(fs.readFileSync(yamlFile, "utf8"));

  const imageTagPairs = _.fromPairs(
    doc.images.map(a => [getPacticipant(a.name), a.newTag])
  );

  const pacticipants = Object.entries(imageTagPairs).map(([name, version]) => ({
    name,
    version
  }));

  const canDeployOptions = {
    pacticipants,
    pactBroker: brokerUrl || process.env.PACT_BROKER_URL,
    pactBrokerToken: brokerToken || process.env.PACT_BROKER_TOKEN,
    retryWhileUnknown: retryTimes || 5,
    retryInterval: retryInterval || 30
  };

  // console.log(!!verbose);

  return pact
    .canDeploy(canDeployOptions)
    .then(console.log)
    .catch(e => {
      throw e;
    });
};
