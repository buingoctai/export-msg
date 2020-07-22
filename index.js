const { MainHandler } = require("./controller");

global.fullExportDir = "";
const init = () => {
  MainHandler();
};

init();
