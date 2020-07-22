const { downloadExternalResource } = require("./untils/index");

exports.htmlTemplate = ({ msgType, message }) => {
  switch (msgType) {
    // text type
    case 1:
      return `<div class="text">${message}</div>`;
    // photo type
    case 2:
      const { normalUrl: url } = message;
      const fileName = url.substring(url.lastIndexOf("/") + 1);

      downloadExternalResource({ msgType, url, fileName });
      return `<a href=${url} target="_blank"><img src="photos/${fileName}" width="300" height="200"></img></a>`;

    default:
      break;
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
