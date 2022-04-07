const path = require("path");

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });

exports.default = async function (context) {
  console.log("after all Artifact Build.js", context);
  await delay(1000);
  console.log("yo 1 second later");
  return [path.resolve(__dirname, "./afterAllArtifactBuild.js")];
};
