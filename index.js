const yargs = require("yargs");
const loadImages = require("./loadImages");
const getImageTag = require("./getImageTag");
const temp = require("./temp");

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
  .demandCommand(1, "You must select one of the commands")
  .help().argv;

// yargs
//   .demandCommand(
//     2,
//     "You must provide the kustomization filename with image for which you want the tag"
//   )
//   .help().argv;

// console.log(`kindCluster: ${kindCluster}; parallel: ${parallel}`);
