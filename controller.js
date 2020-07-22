const fs = require("fs");
const messages = require("./messages.json");
const { writeToHtml, writeToCss } = require("./untils");
const { htmlTemplate, cssTemplate } = require("./template");

const CreateExportDataDir = () => {
  const downloadPath = process.env.USERPROFILE + "/Downloads";
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const timeDir = day + "_" + month + "_" + year;
  const exportDir = "/Zalo Desktop";

  if (!fs.existsSync(downloadPath + exportDir)) {
    fs.mkdirSync(downloadPath + exportDir);
    fs.mkdirSync(downloadPath + exportDir + "/MessageExport_" + timeDir);
    fullExportDir = downloadPath + exportDir + "/MessageExport_" + timeDir;
    fs.mkdirSync(fullExportDir + "/css");
    fs.mkdirSync(fullExportDir + "/photos");
    fs.mkdirSync(fullExportDir + "/mp3s");
    fs.mkdirSync(fullExportDir + "/stickers");
    fs.mkdirSync(fullExportDir + "/mp4s");
  }
};

// Append html, css file
const AppendContent = () => {
  let appendHtml = "";
  let appendCss = "";
  messages.forEach((msgObj) => {
    appendHtml += htmlTemplate(msgObj);
    // appendCss += ".content_wrap{font-weight:1000;color:#168acd}";
  });

  appendHtml += "</body></html>";
  writeToHtml(appendHtml);
};

//Khởi tạo html,css file
exports.MainHandler = () => {
  const initialHtml =
    "<!DOCTYPE html><html><head><meta charset='utf-8' /><title>Exported Data</title><meta content='width=device-width, initial-scale=1.0' name='viewport' /><link href='css/style.css' rel='stylesheet' /></head><body>";

  const initialCss = "body { margin: 0; font: 12px/18px }";

  CreateExportDataDir();
  writeToHtml(initialHtml);
  writeToCss(initialCss);
  AppendContent();
};
