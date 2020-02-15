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
  .demandCommand(
    1,
    "You must provide the kustomization filename with image tags"
  )
  .help().argv;

const kindCluster = argv.kind || "kind";
const filePath = argv._[0];

const yamlFile = path.resolve(filePath);

try {
  const doc = yaml.safeLoad(fs.readFileSync(yamlFile, "utf8"));
  const images = doc.images.map(a => `${a.name}:${a.newTag}`);
  console.log(`pulling images: ${images.join("\n")}`);
  const pullCommand = images.map(a => `docker pull ${a}`).join(";");
  exec(pullCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log("Images pull complete");
    const loadCommand = images
      .map(a => `kind load docker-image --name=${kindCluster} ${a}`)
      .join(" && ");
    console.log("loading images...");
    exec(loadCommand, err1 => {
      if (err1) {
        console.log(err1);
        process.exit(1);
      }
      console.log("Load complete");
    });
    // k run group --image=gcr.io/kollate-218719/group-service:761d438354254949ad29d54bc7faeb51081f4a4e --restart=Never
    // kind load docker-image --name="kind-3" gcr.io/kollate-218719/group-service:761d438354254949ad29d54bc7faeb51081f4a4e
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}
