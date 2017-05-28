"use strict";
exports.__esModule = true;
var electron = require("electron");
var app = electron.app;
var mainWindow;
// 先にpluginを初期化しておく
var node_1 = require("./plugins/node");
var pluginLoader_1 = require("./plugins/pluginLoader");
pluginLoader_1.startPlugins(node_1.plugins);
app.on("window-all-closed", function () {
    app.quit();
});
app.on("ready", function () {
    mainWindow = new electron.BrowserWindow({ minWidth: 640, minHeight: 480 });
    mainWindow.loadURL("file:///" + __dirname + "/../src/html/main.html");
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
});
