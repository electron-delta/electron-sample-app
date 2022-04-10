const axios = require("axios").default;

const getPreviousReleases = async () => {
  let { data } = await axios.get(
    "https://api.github.com/repos/electron-delta/electron-sample-app/releases"
  );

  return data.reduce((arr, release) => {
    release.assets
      .map((d) => d.browser_download_url)
      .filter((d) => d.endsWith(".exe"))
      .forEach((url) => {
        if (!url.endsWith("-delta.exe")) {
          arr.push(url);
        }
      });
    return arr;
  }, []);
};

module.exports = getPreviousReleases;
