const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const logger = require("electron-log");

const DeltaUpdater = require("@electron-delta/updater");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
}


app.whenReady().then(async () => {


  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });


  const deltaUpdater = new DeltaUpdater({
    logger,
    // autoUpdater: require("electron-updater").autoUpdater,
    // hostURL: "you can mention the host url or it's computed from app-update.yml file"
  });
  try {
    await deltaUpdater.boot();
  } catch (error) {
    logger.error(error);
  }

  createWindow();

});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});


ipcMain.handle("get-version", (event) => {
  return app.getVersion();
});
