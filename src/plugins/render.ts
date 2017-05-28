import {setPlugin} from "./pluginLoader";

export var plugins = {};

import * as base from "./base/render";
setPlugin(plugins, base._);
import * as media from "./media/render";
setPlugin(plugins, media._);
import * as output from "./output/render";
setPlugin(plugins, output._);
