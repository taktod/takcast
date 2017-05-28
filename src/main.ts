import * as electron from "electron";

var app = electron.app;
var mainWindow:Electron.BrowserWindow;

// 先にpluginを初期化しておく
import {plugins} from "./plugins/node";
import {startPlugins} from "./plugins/pluginLoader";

startPlugins(plugins);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", () => {
  mainWindow = new electron.BrowserWindow({minWidth:640,minHeight:480});
  mainWindow.loadURL("file:///" + __dirname + "/../src/html/main.html");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
