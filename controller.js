const { writeToHtml, writeToCss } = require("./utils/utils");
const { INITIAL_HTML, END_HTML, INITIAL_CSS } = require("./utils/constants");
const { htmlTemplate, cssTemplate } = require("./template");
const messages = require("./messages.json");

// Initial html,css file
const initialContent = () => {
  writeToHtml(INITIAL_HTML);
  writeToCss(INITIAL_CSS);
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
  appendHtml += END_HTML;
  writeToHtml(appendHtml);
};

exports.MainHandler = () => {
  initialContent();
  AppendContent();
};
