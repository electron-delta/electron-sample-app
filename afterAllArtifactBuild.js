const path = require("path");

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });

exports.default = async function (context) {
  console.log("after all Artifact Build.js", context);
  await delay(10000);
  console.log("yo 10 second later");
  await delay(50000);
  console.log("yo 50 seconds later");
  return [path.resolve(__dirname, "./afterAllArtifactBuild.js")];
};
