const yargs = require("yargs");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const yaml = require("js-yaml");

const argv = yargs
  .command("filename", "kustomization filename with image tags to load to kind")
  .option("kind", {
    alias: "k",
    type: "string",
    describe: "the kind cluster to load file to",
    default: "kind"
  })
  .option("parallel", {
    alias: "p",
    type: "boolean",
    describe: "whether kind load image should be in parallel",
    default: false
  })
  .demandCommand(
    1,
    "You must provide the kustomization filename with image tags"
  )
  .help().argv;

const kindCluster = argv.kind;
const parallel = argv.parallel;
const filePath = argv._[0];

const yamlFile = path.resolve(filePath);

console.log(`kindCluster: ${kindCluster}; parallel: ${parallel}`);

try {
  const doc = yaml.safeLoad(fs.readFileSync(yamlFile, "utf8"));
  const images = doc.images.map(a => `${a.name}:${a.newTag}`);
  console.log(`pulling images: ${images.join("\n")}`);
  const pullCommand = images.map(a => `docker pull ${a}`).join(";");
  const loadCommand = images
    .map(a => `kind load docker-image --name=${kindCluster} ${a}`)
    .join(parallel ? " & " : " && ")
    .concat(parallel ? "& wait" : "");
  exec(pullCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log("Images pull complete");
    console.log("loading images: ", loadCommand);
    exec(loadCommand, err1 => {
      if (err1) {
        console.log(err1);
        process.exit(1);
      }
      console.log("Load complete");
    });
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}
