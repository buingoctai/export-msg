const fs = require("fs");
const { Transform } = require("stream");
const {
  ROOT_FOLDER_NAME,
  SIZE_UNIT_LIST,
  SIZE_UNIT_CONVERT,
  ICON_DOWNLOAD,
  EXTENSION_POPULAR,
  DEFAULT_NAME,
  SHORTEN_NAME,
  MAX_TEXT_LENGTH,
  PHOTO_DIR,
  IMAGE_DIR,
  MP3_DIR,
  STICKER_DIR,
  GIF_DIR,
  MP4_DIR,
  FILE_DIR
} = require("./constants");


createRootExportPath = (path, index = 0) => {
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.getMonth();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  const timeDir = "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + second;
  const newPath = path + timeDir

  rootExportPath = newPath;
  return fs.mkdirSync(newPath, { recursive: true });
};
exports.createRootExportPath = createRootExportPath;

exports.createExportDataDir = () => {
  fullExportPath = rootExportPath + ROOT_FOLDER_NAME;

  fs.mkdirSync(fullExportPath);
  fs.mkdirSync(fullExportPath + "/js");
  fs.mkdirSync(fullExportPath + "/images");
  fs.mkdirSync(fullExportPath + "/css");
  fs.mkdirSync(fullExportPath + "/photos");
  fs.mkdirSync(fullExportPath + "/mp3s");
  fs.mkdirSync(fullExportPath + "/stickers");
  fs.mkdirSync(fullExportPath + "/gifs");
  fs.mkdirSync(fullExportPath + "/mp4s");
  fs.mkdirSync(fullExportPath + "/files");
};

exports.writeToFile = (content, subPath) => {
  let writeStream = fs.createWriteStream(fullExportPath + subPath, {
    flags: "a",
  });

  writeStream.write(content);
  writeStream.end();
}

exports.detectFileName = (url) => {
  const fileName = url.substring(url.lastIndexOf("/") + 1).toLowerCase();
  const hasExtension = fileName.includes(".");

  if (hasExtension) {
    return fileName;
  }
  return `${fileName}.png`;
};

const convertSizeOfFile = (size, i) => {
  const devidedResult = size / SIZE_UNIT_CONVERT;

  if (devidedResult < 1) {
    const roundedSize = Math.round(size * 100) / 100;
    return `${roundedSize} ${SIZE_UNIT_LIST[i]}`;
  }
  return convertSizeOfFile(devidedResult, i + 1);
};

exports.isJoinedUserBefore = (peviousObj, currentObj) => {
  if (peviousObj && currentObj.fromUid === peviousObj.fromUid) {
    return true;
  }
  return false;
};

exports.convertTimeFormat = (timeNumber) => {
  return new Date(timeNumber).toLocaleTimeString();
};

exports.determinateThumb = (fileName) => {
  let extension = fileName
    .substring(fileName.lastIndexOf(".") + 1)
    .toLowerCase();
  const isPopularExtension = EXTENSION_POPULAR.includes(extension);
  let url = "";

  if (isPopularExtension) {
    extension = (extension === "mp3" && "music") || extension;
    extension = (extension === "mp4" && "video") || extension;
    url = ICON_DOWNLOAD.replace("typeValue", extension);
  } else {
    url = ICON_DOWNLOAD.replace("typeValue", "default");
  }

  return { extension, url };
};

exports.determinateAvatar = (fromUid, name) => {
  const crypto = require("crypto");
  const color =
    "#" + crypto.createHash("md5").update(fromUid).digest("hex").substr(0, 6);
  const lastSpaceIndex = name.lastIndexOf(" ");
  let shortenName = "";

  if (fromUid === "0") {
    return { shortenName: SHORTEN_NAME, name: DEFAULT_NAME, color };
  }

  if (lastSpaceIndex === -1) {
    shortenName = name.charAt(0);
  } else {
    const lastName = name.substring(name.lastIndexOf(" ") + 1);
    shortenName = name.charAt(0) + lastName.charAt(0);
  }
  return { shortenName, name, color };
};

const limitText = (text) => {
  const lastSpaceIndex = text.lastIndexOf(" ");

  if (text.length < MAX_TEXT_LENGTH || lastSpaceIndex === -1) {
    return text;
  }
  return limitText(`${text.substring(0, lastSpaceIndex)}...`);
};
exports.limitText = limitText;

exports.downloadExternalResource = async ({ msgType, url, fileName }) => {
  const protocol =
    url.includes("http") && !url.includes("https")
      ? require("http")
      : require("https");
  let subDir = "";
  let size = 0;

  switch (msgType) {
    case 2:
      subDir += "/" + PHOTO_DIR;
      break;
    case 3:
      subDir += "/" + MP3_DIR;
      break;
    case 4:
      subDir += "/" + STICKER_DIR;
      break;
    case 6:
      subDir += "/" + IMAGE_DIR;
      break;
    case 7:
      subDir += "/" + GIF_DIR;
      break;
    case 18:
      subDir += "/" + MP4_DIR;
      break;
    case 19:
      subDir += "/" + FILE_DIR;
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
          resolve(convertSizeOfFile(size, 0));
        });
      })
      .end();
  });
};
