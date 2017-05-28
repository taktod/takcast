import {setPlugin} from "./pluginLoader";

export var plugins = {};

import * as base from "./base/node";
setPlugin(plugins, base._);
import * as media from "./media/node";
setPlugin(plugins, media._);
import * as output from "./output/node";
setPlugin(plugins, output._);
