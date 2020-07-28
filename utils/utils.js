const fs = require("fs");
const { Transform } = require("stream");
const { ROOT_EXPORT_PATH, SIZE_UNIT_LIST, MIN_SIZE } = require("./constants");
exports.createRootExportPath = (path) => {
  return fs.promises.mkdir(path, { recursive: true });
}

exports.createExportDataDir = () => {
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const timeDir = day + "_" + month + "_" + year;
  fullExportPath = ROOT_EXPORT_PATH + "/MessageExport_" + timeDir;

  if (!fs.existsSync(fullExportPath)) {
    fs.mkdirSync(fullExportPath);
    fs.mkdirSync(fullExportPath + "/js");
    fs.mkdirSync(fullExportPath + "/css");
    fs.mkdirSync(fullExportPath + "/photos");
    fs.mkdirSync(fullExportPath + "/mp3s");
    fs.mkdirSync(fullExportPath + "/stickers");
    fs.mkdirSync(fullExportPath + "/mp4s");
    fs.mkdirSync(fullExportPath + "/files");
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

exports.writeToJs = (jsContent) => {
  let writeStream = fs.createWriteStream(fullExportPath + "/js/script.js", {
    flags: "a",
  });

  writeStream.write(jsContent);
  writeStream.end();
};

exports.detectFileName = (url) => {
  const fileName = url.substring(url.lastIndexOf("/") + 1).toLowerCase();
  const hasExtension = fileName.includes(".");
  if (hasExtension) {
    return fileName;
  }
  return `${fileName}.png`;
};

const ConvertSizeOfFile = (size, i) => {
  const devidedResult = size / MIN_SIZE;

  if (devidedResult < 1) {
    const roundedSize = Math.round(size * 100) / 100;
    return `${roundedSize} ${SIZE_UNIT_LIST[i]}`
  }
  return ConvertSizeOfFile(devidedResult, i + 1)
}

exports.downloadExternalResource = async ({ msgType, url, fileName }) => {
  const protocol =
    url.includes("http") && !url.includes("https")
      ? require("http")
      : require("https");
  let subDir = "";
  let size = 0;

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
    case 19:
      subDir += "/files";
      break;
    case 6:
      subDir += "/photos";
      break;
    default:
  }

  return new Promise((resolve, __) => {
    protocol
      .request(url, function (response) {
        let data = new Transform();

        response.on("data", function (chunk) {
          data.push(chunk);
          size += chunk.length;
        });
        response.on("end", function () {
          fs.writeFileSync(
            fullExportPath + subDir + `/${fileName}`,
            data.read()
          );
          resolve(ConvertSizeOfFile(size, 0));
        });
      })
      .end();
  });
};
