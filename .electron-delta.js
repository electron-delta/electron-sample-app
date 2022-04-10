// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");
const path = require("path");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),

  productName: "electron-sample-app",

  getPreviousReleases: async () => {
    let releases = await fetch(
      "https://api.github.com/repos/electron-delta/electron-sample-app/releases"
    ).then((res) => res.json());

    console.log(releases);

    return [];

    // return [
    //   "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.1/electron-sample-app-0.0.1.exe",
    //   "https://github.com/electron-delta/electron-sample-app/releases/download/v0.0.2/electron-sample-app-0.0.2.exe",
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
