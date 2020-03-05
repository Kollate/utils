const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

exports.getImages = function(yamlFile) {
  const doc = yaml.safeLoad(fs.readFileSync(path.resolve(yamlFile), "utf8"));
  const images = doc.images.map(a => `${a.name}:${a.newTag}`);
  return images.join(" ");
};
