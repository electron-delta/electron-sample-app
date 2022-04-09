// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");
const path = require("path");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "electron-sample-app",
  processName: "electron-sample-app",

  cache: path.join(__dirname, ".cache/ELECTRON_DELTA"),
  logger: console,

  getPreviousReleases: async () => {
    return [
      "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.1/electron-sample-app-0.0.1.exe",
    ];
  },
  sign: async (filePath) => {
    return filePath;
  },
};

exports.default = async function (context) {
  const deltaInstallerFiles = await DeltaBuilder.build({
    context,
    options,
  });
  return deltaInstallerFiles;
};
