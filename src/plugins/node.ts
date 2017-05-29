import {setPlugin} from "./pluginLoader";

export var plugins = {};

import * as base from "./base/node";
setPlugin(plugins, base._);
import * as media from "./media/node";
setPlugin(plugins, media._);
import * as output from "./output/node";
setPlugin(plugins, output._);
import * as tc_capture from "@takcast/capture/node";
setPlugin(plugins, tc_capture._);
import * as tc_imagemixer from "@takcast/imagemixer/node";
setPlugin(plugins, tc_imagemixer._);
import * as tc_mediafile from "@takcast/mediafile/node";
setPlugin(plugins, tc_mediafile._);
import * as tc_webmfile from "@takcast/webmfile/node";
setPlugin(plugins, tc_webmfile._);
