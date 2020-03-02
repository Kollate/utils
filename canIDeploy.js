require("dotenv").config();
const path = require("path");
const { getPacticipant } = require("./getPacticipant");
const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");
const pact = require("@pact-foundation/pact-node");

function getPacticipants({ kustomizeFile, serviceNames }) {
  const yamlFile = path.resolve(kustomizeFile);
  const doc = yaml.safeLoad(fs.readFileSync(yamlFile, "utf8"));

  const imageTagPairs = _.fromPairs(
    doc.images
      .filter(a => serviceNames.indexOf(_.last(a.name.split("/"))) > -1)
      .map(a => [getPacticipant(a.name), a.newTag])
  );

  const pacticipants = Object.entries(imageTagPairs).map(([name, version]) => ({
    name,
    version
  }));
  return pacticipants;
}

exports.getPacticipants = getPacticipants;

exports.canIDeploy = function({
  kustomizeFile,
  retryTimes,
  retryInterval,
  brokerUrl,
  brokerToken,
  consumer,
  providers
  // verbose
}) {
  const defaultOptions = {
    pactBroker: brokerUrl || process.env.PACT_BROKER_URL,
    pactBrokerToken: brokerToken || process.env.PACT_BROKER_TOKEN,
    retryWhileUnknown: retryTimes || 5,
    retryInterval: retryInterval || 30,
    output: "table"
  };
  const promises = providers.map(provider => {
    const pacticipants = getPacticipants({
      kustomizeFile,
      serviceNames: [consumer, provider]
    });
    const canDeployOptions = { pacticipants, ...defaultOptions };
    return pact.canDeploy(canDeployOptions).catch(
      async () =>
        await pact.canDeploy({
          ...canDeployOptions,
          retryWhileUnknown: 0,
          retryInterval: 0
        })
    );
  });
  return Promise.all(promises);
};
