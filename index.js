const { CreateExportDataDir } = require("./utils/utils");
const { ROOT_EXPORT_PATH } = require("./utils/constants");
const { MainHandler } = require("./controller");

global.fullExportPath = "";
const init = () => {
  CreateExportDataDir(ROOT_EXPORT_PATH);
  MainHandler();
};

init();
