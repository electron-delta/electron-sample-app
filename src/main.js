const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const logger = require("electron-log");

const DeltaUpdater = require("@electron-delta/updater");

let mainWindow, tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
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
    hostURL: "http://localhost:3000",
  });
  try {
    await deltaUpdater.boot({
      splashScreen: true
    });
  } catch (error) {
    logger.error(error);
  }

  createWindow();

  tray = new Tray(path.join(app.getAppPath(), "tray.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Check for updates",
      click: () => {
        deltaUpdater.checkForUpdates();
      }
    }
  ]);

  tray.setToolTip("Electron Sample App");
  tray.setContextMenu(contextMenu);

});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});


ipcMain.handle("get-version", (event) => {
  return app.getVersion();
});
