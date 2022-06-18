const axios = require("axios").default;

// const headers = {
//   "Authorization": `token ${process.env.GH_TOKEN}`,
// };

const getPreviousReleases = async ({ platform, target }) => {
  let { data } = await axios.get(
    "https://api.github.com/repos/electron-delta/electron-sample-app/releases",
  );

  const ext = platform === 'win' ? (target === 'nsis-web' ? ".7z" : ".exe") : ".zip";
  let prevReleases = data.reduce((arr, release) => {
    release.assets
      .map((d) => {
        return d.browser_download_url
      })
      .filter((d) => d.endsWith(ext))
      .forEach((url) => {
        if (!url.endsWith("-delta.exe")) {
          arr.push({ version: release.tag_name, url });
        }
      });
    return arr;
  }, []);

  console.log("prevReleases", prevReleases);

  return prevReleases.slice(0, 3);
};

module.exports = getPreviousReleases;
