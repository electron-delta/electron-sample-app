// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");

const path = require("path");
// const getPreviousReleases = require("./build_scripts/get-previous-releases");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "electron-sample-app",
  getWindowsPreviousReleases: async () => {
    return [
      {
        version: "2.0.0",
        url: "http://localhost:3000/electron-sample-app-2.0.0.exe",
      }
    ];
  },
  getMacPreviousReleases: async () => {
    return [
      {
        version: "2.0.0",
        url: "http://localhost:3000/electron-sample-app-2.0.0-mac.zip",
      },
    ];
  },
  sign: async (filePath) => {
    // sign each delta executable
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
