const { createExportDataDir, createRootExportPath } = require("./utils/utils");
const { ROOT_EXPORT_PATH } = require("./utils/constants");
const { MainHandler } = require("./controller");


global.fullExportPath = "";
const init = async () => {
  createRootExportPath(ROOT_EXPORT_PATH)
    .then(() => {
      createExportDataDir();
      MainHandler();
    })
    .catch(() => { return });
};

init();
