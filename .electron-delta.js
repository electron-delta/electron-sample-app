// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");

const path = require("path");
const getPreviousReleases = require("./build_scripts/get-previous-releases");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "electron-sample-app",
  cache: path.join(__dirname, "./cache"),
  getPreviousReleases: ({ platform, target }) => {
    console.log("getPreviousReleases", platform, target);
    return getPreviousReleases({ platform, target });
    // return [
    //   {
    //     version: "2.0.3",
    //     url: "http://localhost:3000/electron-sample-app-2.0.3-mac.zip"
    //   }
    // ];
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
