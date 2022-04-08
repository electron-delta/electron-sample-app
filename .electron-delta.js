// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");
const path = require("path");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "electron-quick-start",
  processName: "electron-quick-start",

  cache: path.join(__dirname, ".cache/ELECTRON_DELTA"),
  logger: console,

  getPreviousReleases: async () => {
    return [
      "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.6/electron-quick-start-0.0.6.exe",
      "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.4/electron-quick-start-0.0.4.exe",
      "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.3/electron-quick-start-0.0.3.exe",
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
