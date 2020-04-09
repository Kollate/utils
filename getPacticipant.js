const _ = require("lodash");

const getPacticipantForImage = (service) => {
  return getPacticipant(_.last(service.split("/")));
};

const getPacticipant = (service) => {
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
    case "email-processor-service":
      return "EmailProcessorService";
    default:
      throw new Error("Pacticipant not matched");
  }
};

module.exports = {
  getPacticipantForImage,
  getPacticipant,
};
