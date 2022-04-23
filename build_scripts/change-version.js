const path = require("path");
const fs = require("fs");

const modifyPackageJsonVersion = (newVersion) => {
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  const packageJsonContents = fs.readFileSync(packageJsonPath);
  const packageJson = JSON.parse(packageJsonContents);

  const oldVersion = packageJson.version;
  packageJson.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(
    `package.json version changed from ${oldVersion} to ${newVersion}`
  );
};

try {
  let newVersion = process.env.APPVEYOR_BUILD_VERSION;
  modifyPackageJsonVersion(newVersion);
} catch (err) {
  console.error(err);
}
