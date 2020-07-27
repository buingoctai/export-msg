const ejs = require("ejs");
const { detectFileName, downloadExternalResource } = require("./utils/utils");
const { STICKER_URL } = require("./utils/constants");

exports.htmlTemplate = async ({ msgType, message }) => {
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
  // Sticker type - gắn default extension là png, chưa xử lý width cho mỗi loại sticker
  else if (msgType === 4) {
    const { id } = message;
    const url = STICKER_URL.replace("IdValue", id);
    const fileName = `${id}.png`;
    await downloadExternalResource({
      msgType,
      url,
      fileName,
    });

    const stringHtml = await ejs.renderFile("./templates/msg-4.ejs");
    return stringHtml.replace("fileName", fileName);
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
  // File type - Còn trường hợp thumb có tồn tại hay không, chưa phân thành thư mục riêng cho các loại file(mp3,mp4, còn lại)
  else if (msgType === 19) {
    const { title = "", href = "", thumb = "", params = {} } = message;
    const urlLocal = fullExportPath + "/files/" + title;
    const size = await downloadExternalResource({
      msgType,
      url: href,
      fileName: title,
    });

    return ejs.renderFile("./templates/msg-19.ejs", {
      url: urlLocal,
      title,
      size,
    });
  }
  // Default
  else {
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
