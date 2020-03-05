const yargs = require("yargs");
const loadImages = require("./loadImages");
const getImageTag = require("./getImageTag");
const { getImages } = require("./getImages");
const { canIDeploy } = require("./canIDeploy");
// const temp = require("./temp");

// yargs.command(temp).help().argv;

yargs
  .command(
    "load <filepath>",
    "kustomization filename with image tags to load to kind",
    yargs => {
      return yargs
        .option("kind", {
          alias: "k",
          type: "string",
          describe: "the kind cluster to load file to",
          default: "kind"
        })
        .option("skip", {
          type: "string",
          describe: "what image names to skip",
          default: ""
        });
    },
    ({ filepath, skip, kind }) => {
      loadImages({ yamlFile: filepath, skipImage: skip, kindCluster: kind });
    }
  )
  .command(
    "tag <filepath> <imageName>",
    "get the image",
    yargs => {
      return yargs;
    },
    argv => {
      console.log(
        getImageTag({
          filePath: argv.filepath,
          imageName: argv.imageName
        })
      );
    }
  )
  .command(
    "getImages <filepath>",
    "get all the images with tags in kustomize yaml file",
    yargs => {
      return yargs;
    },
    argv => {
      console.log(getImages(argv.filepath));
    }
  )
  .command(
    "canIDeploy <filepath>",
    "Check if the pacticipants in the kustomization file with tags pass the deployment test",
    yargs => {
      return yargs
        .option("brokerToken", {
          alias: "t",
          type: "string",
          describe: "broker auth token"
        })
        .demand(["brokerToken"])
        .option("consumer", {
          type: "string",
          describe: "name of the consumer"
        })
        .demand(["consumer"])
        .option("providers", {
          type: "array",
          describe: "providers on which the consumer depends"
        })
        .demand(["providers"])
        .check(argv => argv.providers.length > 0, false)
        .option("brokerUrl", {
          alias: "b",
          type: "string",
          describe: "pact broker url",
          default: "https://crewhood.pact.dius.com.au"
        })
        .option("retryTimes", {
          alias: "N",
          type: "number",
          describe:
            "number of times pact broker should check if the pacticipants are compatible",
          default: 5
        })
        .option("retryInterval", {
          alias: "I",
          type: "number",
          describe: "interval (in seconds) between checks",
          default: 30
        });
    },
    argv => {
      return canIDeploy({
        kustomizeFile: argv.filepath,
        consumer: argv.consumer,
        providers: argv.providers,
        retryInterval: argv.retryInterval,
        retryTimes: argv.retryTimes,
        brokerToken: argv.brokerToken,
        brokerUrl: argv.brokerUrl
      });
    }
  )
  .demandCommand(1, "You must select one of the commands")
  .help().argv;

// yargs
//   .demandCommand(
//     2,
//     "You must provide the kustomization filename with image for which you want the tag"
//   )
//   .help().argv;

// console.log(`kindCluster: ${kindCluster}; parallel: ${parallel}`);
