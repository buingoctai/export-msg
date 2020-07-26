const ejs = require("ejs");
const { downloadExternalResource } = require("./utils/utils");

exports.htmlTemplate = async ({ msgType, message }) => {
  switch (msgType) {
    // Text type
    case 1:
      return ejs.renderFile("./templates/msg-1.ejs", { message });
    // Photo type
    case 2:
      const { normalUrl: url } = message;
      const fileName = url.substring(url.lastIndexOf("/") + 1);

      downloadExternalResource({ msgType, url, fileName });
      return ejs.renderFile("./templates/msg-2.ejs", { url, fileName });
    default:
      return "";
  }
};

exports.cssTemplate = (msgType) => {
  switch (1) {
    case 1:
      break;
    case 2:
      break;
    default:
  }
};
