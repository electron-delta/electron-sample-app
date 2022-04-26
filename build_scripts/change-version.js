const path = require("path");
const fs = require("fs");

const { exec } = require('child_process');

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
  exec("git tag --sort=committerdate | grep -E '[0-9]' | tail -1 | cut -b 2-7", (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    let newVersion = stdout.trim();
    modifyPackageJsonVersion(newVersion);
    exec("npm version patch");
  });
} catch (err) {
  console.error(err);
}
