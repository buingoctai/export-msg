const ejs = require("ejs");
const { detectFileName, downloadExternalResource, determinateThumb } = require("./utils/utils");
const { STICKER_URL, LOCATION_ICON, GOOGLE_MAP } = require("./utils/constants");

exports.htmlTemplate = async ({ msgType, msgId, message }) => {
  // Text type
  if (msgType === 1) {
    return ejs.renderFile("./templates/msg-1.ejs", { message });
  }
  // Photo type
  else if (msgType === 2) {
    const { normalUrl: url = "", title = "" } = message;
    const fileName = detectFileName(url);
    const size = await downloadExternalResource({ msgType, url, fileName });
    const urlLocal = fullExportPath + "/photos/" + fileName;

    return ejs.renderFile("./templates/msg-2.ejs", {
      url: urlLocal,
      fileName,
      title,
      size,
    });
  }
  // Mp3 type
  else if (msgType === 3) {
    const { href: url } = message;
    const fileName = `${msgId}.mp3`;
    await downloadExternalResource({ msgType, url, fileName });
    const urlLocal = fullExportPath + "/mp3s/" + fileName;

    return ejs.renderFile("./templates/msg-3.ejs", {
      url: urlLocal,
      fileName,
    });
  }
  // Sticker type - gắn default extension là png, chưa xử lý width cho mỗi loại sticker
  else if (msgType === 4) {
    const { id } = message;
    const url = STICKER_URL.replace("IdValue", id);
    const fileName = `${id}.png`;
    const urlLocal = fullExportPath + "/stickers/" + fileName;
    await downloadExternalResource({
      msgType,
      url,
      fileName,
    });

    const stringHtml = await ejs.renderFile("./templates/msg-4.ejs", { url: urlLocal });
    return stringHtml
      .replace("fileNameValue", fileName)
      .replace("pathValue", fullExportPath);
  }
  // Link type - Còn trường hợp thumb không có extension, trường hợp href không hợp lệ
  else if (msgType === 6) {
    const { title = "", description = "", href = "", thumb = "" } = message;
    const fileName = detectFileName(thumb);
    await downloadExternalResource({
      msgType,
      url: thumb,
      fileName: fileName,
    });

    return ejs.renderFile("./templates/msg-6.ejs", {
      fileName,
      url: href,
      title,
      description,
    });
  }
  // Gif
  else if (msgType === 7) {
    const { normalUrl: url } = message;
    const fileName = `${msgId}.gif`;
    const urlLocal = fullExportPath + "/gifs/" + fileName;
    await downloadExternalResource({
      msgType,
      url,
      fileName,
    });

    return ejs.renderFile("./templates/msg-7.ejs", {
      fileName,
      url: urlLocal,
    });
  }
  // // Location type
  else if (msgType === 17) {
    const { desc, lat, lo } = message;
    const iconName = "location.png";
    const urlGgMap = GOOGLE_MAP.replace("latValue", lat).replace("loValue", lo);
    await downloadExternalResource({
      msgType: 6,
      url: LOCATION_ICON,
      fileName: iconName,
    });

    return ejs.renderFile("./templates/msg-17.ejs", {
      fileName: iconName,
      url: urlGgMap,
      desc,
      lat,
      lo,
    });
  }
  // File type - Còn trường hợp thumb có tồn tại hay không, chưa phân thành thư mục riêng cho các loại file(mp3,mp4, còn lại)
  else if (msgType === 19) {
    const { title = "", href = "", thumb = "" } = message;
    let fileName = "";
    const urlLocal = fullExportPath + "/files/" + title;
    const size = await downloadExternalResource({
      msgType,
      url: href,
      fileName: title,
    });
    if (thumb) {
      fileName = detectFileName(thumb);
      downloadExternalResource({
        msgType: 6,
        url: thumb,
        fileName,
      });
    } else {
      const { extension, url } = determinateThumb(title);
      fileName = `${extension}.svg`;
      await downloadExternalResource({ msgType: 6, url, fileName });
    }

    return ejs.renderFile("./templates/msg-19.ejs", {
      url: urlLocal,
      title,
      size,
      fileName
    });
  }
  // Default
  else {
    return ejs.renderFile("./templates/default.ejs", {
      title: JSON.stringify(message),
    });
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
