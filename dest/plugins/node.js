"use strict";
exports.__esModule = true;
var pluginLoader_1 = require("./pluginLoader");
exports.plugins = {};
var base = require("./base/node");
pluginLoader_1.setPlugin(exports.plugins, base._);
var media = require("./media/node");
pluginLoader_1.setPlugin(exports.plugins, media._);
var output = require("./output/node");
pluginLoader_1.setPlugin(exports.plugins, output._);
var tc_capture = require("@takcast/capture/node");
pluginLoader_1.setPlugin(exports.plugins, tc_capture._);
var tc_desktopcapture = require("@takcast/desktopcapture/node");
pluginLoader_1.setPlugin(exports.plugins, tc_desktopcapture._);
var tc_imagemixer = require("@takcast/imagemixer/node");
pluginLoader_1.setPlugin(exports.plugins, tc_imagemixer._);
var tc_mediafile = require("@takcast/mediafile/node");
pluginLoader_1.setPlugin(exports.plugins, tc_mediafile._);
var tc_webmfile = require("@takcast/webmfile/node");
pluginLoader_1.setPlugin(exports.plugins, tc_webmfile._);
var tc_webmsocket = require("@takcast/webmsocket/node");
pluginLoader_1.setPlugin(exports.plugins, tc_webmsocket._);
