const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const yaml = require("js-yaml");

function loadImages({
  yamlFile,
  skipImage = "",
  kindCluster = "kind",
  cb = () => {}
} = {}) {
  try {
    const parallel = true;
    const doc = yaml.safeLoad(fs.readFileSync(path.resolve(yamlFile), "utf8"));
    const images = doc.images
      .filter(a => a.name !== skipImage)
      .map(a => `${a.name}:${a.newTag}`);
    console.log(`⌛pulling images: ${images.join("\n")}`);
    const pullCommand = images.map(a => `docker pull ${a}`).join(";");
    const loadCommand = images
      .map(a => `kind load docker-image --name=${kindCluster} ${a}`)
      .join(parallel ? " & " : " && ")
      .concat(parallel ? " & wait" : "");
    exec(pullCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log("🎰 Images pull complete");
      console.log("👷 loading images: ", loadCommand);
      exec(loadCommand, err1 => {
        if (err1) {
          console.log(err1);
          throw error;
        }
        console.log("🙋 Load complete");
        cb();
      });
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = loadImages;
// module.exports = {
//   name: "load",
//   command: "load filename",
//   description: "load images to kind cluster",
//   options: {
//     kind: {
//       required: false,
//       default: "kind",
//       type: "string"
//     }
//   },
//   callback: console.log
// };
// exports.handler = argv => {
//   loadImages({ filePath: argv._[0], imageName: argv._[1] });
// };

// exports.options = {
//   kind: {

//   }
// }
// exports.options = y => {
//   y.option("kind", {
//     default: "kind"
//   });
//   y.option("skip", {
//     default: ""
//   });
//   y.option("clusterName", {
//     default: ""
//   });
//   return y;
// };

// exports.command =
//   "loadToKind <filename> --kind=[clusterName] --skip=[skipImage]";
// exports.describe =
//   "kustomization <filename> with image tags to load to kind cluster [cluster-name] and skipping image [imageName]";
