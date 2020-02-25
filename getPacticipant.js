const capitalize = require("capitalize");
const _ = require("lodash");

exports.getPacticipant = service =>
  capitalize
    .words(
      _.last(service.split("/"))
        .split("-")
        .join(" ")
    )
    .split(" ")
    .join("");
