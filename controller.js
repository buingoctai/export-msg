const ejs = require("ejs");
const { writeToHtml, writeToCss, writeToJs } = require("./utils/utils");
const { INITIAL_CSS } = require("./utils/constants");
const { onMouseOver } = require("./public/script");
const { htmlTemplate, cssTemplate } = require("./template");
const messages = require("./messages.json");

// Initial html,css file
const initialContent = async () => {
  const htmlString = await ejs.renderFile("./templates/initial.ejs");

  writeToHtml(htmlString);
  writeToCss(INITIAL_CSS);
  writeToJs(onMouseOver.toString());
};
// Append html, css file
const AppendContent = async () => {
  let appendHtml = "";
  let appendCss = "";

  for (let i = 0; i < messages.length; i++) {
    const htmlString = await htmlTemplate(messages[i]);

    if (htmlString) {
      appendHtml += htmlString;
    }
  }
  appendHtml += await ejs.renderFile("./templates/end.ejs");
  writeToHtml(appendHtml);
};

exports.MainHandler = async () => {
  await initialContent();
  await AppendContent();
};
