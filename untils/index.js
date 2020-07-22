const https = require("https");
const fs = require("fs");
const { Transform } = require("stream");

exports.writeToHtml = (htmlContent) => {
  let writeStream = fs.createWriteStream(fullExportDir + "/index.html");
  writeStream.write(htmlContent);

  writeStream.on("finish", () => {
    console.log("wrote all data to file html");
  });
  writeStream.end();
};

exports.writeToCss = (cssContent) => {
  let writeStream = fs.createWriteStream(fullExportDir + "/css/style.css");
  writeStream.write(cssContent);

  writeStream.on("finish", () => {
    console.log("wrote all data to file css");
  });
  writeStream.end();
};

exports.downloadExternalResource = ({ msgType, url, fileName }) => {
  let subDir = "";

  switch (msgType) {
    case 2:
      subDir += "/photos";
      break;
    case 3:
      subDir += "/mp3s";
      break;
    case 4:
      subDir += "/stickers";
      break;
    case 18:
      subDir += "/mp4s";
      break;
    default:
  }

  https
    .request(url, function (response) {
      let data = new Transform();

      response.on("data", function (chunk) {
        data.push(chunk);
      });
      response.on("end", function () {
        fs.writeFileSync(fullExportDir + subDir + `/${fileName}`, data.read());
      });
    })
    .end();
};
