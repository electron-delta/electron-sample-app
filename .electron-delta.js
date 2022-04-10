// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");
const path = require("path");
const axios = require("axios").default;

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),

  productName: "electron-sample-app",

  getPreviousReleases: async () => {
    let { data } = await axios.get(
      "https://api.github.com/repos/electron-delta/electron-sample-app/releases"
    );

    return data.reduce((arr, release) => {
      release.assets
        .map((d) => d.browser_download_url)
        .filter((d) => d.endsWith(".exe"))
        .forEach((url) => {
          if (url.endsWith("-delta.exe")) {
            arr.push(url);
          }
        });
      console.log(arr);
      return arr;
    }, []);
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
