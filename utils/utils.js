const https = require("https");
const fs = require("fs");
const { Transform } = require("stream");

exports.CreateExportDataDir = (rootExportPath) => {
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const timeDir = day + "_" + month + "_" + year;
  const exportDir = "/Zalo Desktop";

  if (!fs.existsSync(rootExportPath + exportDir)) {
    fs.mkdirSync(rootExportPath + exportDir);
    fs.mkdirSync(rootExportPath + exportDir + "/MessageExport_" + timeDir);
    fullExportPath = rootExportPath + exportDir + "/MessageExport_" + timeDir;
    fs.mkdirSync(fullExportPath + "/css");
    fs.mkdirSync(fullExportPath + "/photos");
    fs.mkdirSync(fullExportPath + "/mp3s");
    fs.mkdirSync(fullExportPath + "/stickers");
    fs.mkdirSync(fullExportPath + "/mp4s");
  }
};

exports.writeToHtml = (htmlContent) => {
  let writeStream = fs.createWriteStream(fullExportPath + "/index.html", {
    flags: "a",
  });

  writeStream.write(htmlContent);
  writeStream.end();
};

exports.writeToCss = (cssContent) => {
  let writeStream = fs.createWriteStream(fullExportPath + "/css/style.css", {
    flags: "a",
  });

  writeStream.write(cssContent);
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
        fs.writeFileSync(fullExportPath + subDir + `/${fileName}`, data.read());
      });
    })
    .end();
};
