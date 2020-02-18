const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");

function getImage({ filePath, imageName }) {
  const yamlFile = path.resolve(filePath);
  const doc = yaml.safeLoad(fs.readFileSync(yamlFile, "utf8"));
  const images = _.fromPairs(doc.images.map(a => [a.name, a.newTag]));
  if (!images[imageName]) {
    throw new Error(`Image ${imageName} not found`);
  }
  return images[imageName].toString();
}

module.exports = getImage;
// exports.handler = argv => {
//   getImage({ filePath: argv._[0], imageName: argv._[1] });
// };

// exports.command = "<filename> <imageName>";
// exports.describe =
//   "get the tag of the imageName in the kustomization file <filename>";
// module.exports = getImage;

// if (require.main === module) {
//   console.log(
//     getImage("../gitops/overlays/prod-images/kustomization.yaml", "frontend")
//   );
//   console.log(
//     getImage(
//       "../gitops/overlays/prod-images/kustomization.yaml",
//       "doesnot-exist"
//     )
//   );
// }
