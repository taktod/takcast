import {setPlugin} from "./pluginLoader";

export var plugins = {};

import * as base from "./base/render";
setPlugin(plugins, base._);
import * as media from "./media/render";
setPlugin(plugins, media._);
import * as output from "./output/render";
setPlugin(plugins, output._);
import * as tc_capture from "@takcast/capture/render";
setPlugin(plugins, tc_capture._);
import * as tc_imagemixer from "@takcast/imagemixer/render";
setPlugin(plugins, tc_imagemixer._);
import * as tc_mediafile from "@takcast/mediafile/render";
setPlugin(plugins, tc_mediafile._);
import * as tc_webmfile from "@takcast/webmfile/render";
setPlugin(plugins, tc_webmfile._);
