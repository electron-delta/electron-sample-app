const axios = require("axios").default;

const getPreviousReleases = async () => {
  let { data } = await axios.get(
    "https://api.github.com/repos/electron-delta/electron-sample-app/releases",
    {
      headers: {
        "Authorization": `token ${process.env.GH_TOKEN}`,
      }
    }
  );
  let prevReleases = data.reduce((arr, release) => {
    release.assets
      .map((d) => {
        return d.browser_download_url
      })
      .filter((d) => d.endsWith(".exe"))
      .forEach((url) => {
        if (!url.endsWith("-delta.exe")) {
          arr.push({ version: release.tag_name, url });
        }
      });
    return arr;
  }, []);

  return prevReleases.slice(0, 3);
};

module.exports = getPreviousReleases;
