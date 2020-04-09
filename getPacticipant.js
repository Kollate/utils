const capitalize = require("capitalize");
const _ = require("lodash");

// exports.getPacticipant = (service) =>
//   capitalize
//     .words(
//       _.last(service.split("/"))
//         .split("-")
//         .join(" ")
//     )
//     .split(" ")
//     .join("");

exports.getPacticipant = (service) => {
  switch (service) {
    case "group-service":
      return "GroupService";
    case "qa-service":
      return "QAService";
    case "auth-service":
      return "AuthService";
    case "frontend":
      return "Frontend";
    case "gateway":
      return "Gateway";
    case "file-service":
      return "FileService";
    case "email-service":
      return "EmailService";
    default:
      throw new Error("Pacticipant not matched");
  }
};
