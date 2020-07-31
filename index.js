const { createExportDataDir, createRootExportPath } = require("./utils/utils");
const { ROOT_EXPORT_PATH } = require("./utils/constants");
const { MainHandler } = require("./controller");

global.fullExportPath = "";
global.rootExportPath = "";
global.downloadedResource = {};
const main = () => {
  createRootExportPath(ROOT_EXPORT_PATH);
  createExportDataDir();
  MainHandler();

};

main();
