"use strict";
exports.__esModule = true;
// pluginがそれぞれ読み込まれたら配列に保存しておく。
exports.setPlugin = function (plugins, plugin) {
    if (typeof (plugins[plugin.type]) == "undefined") {
        plugins[plugin.type] = [];
    }
    plugins[plugin.type].push(plugin);
};
// すべてのpluginの読み込みが終わったらplugin参照できるチャンスを与えます。
exports.startPlugins = function (plugins) {
    // これはpluginsの中身はその順番になるけど、keysのkeyがどういう順番になるかは不明
    // とりあえずbase、media、field、sourceといった順番になってた方が都合がよさそう。
    // mediaFieldPluginの初期化の部分で、保持しているmediaPluginのaudioNode -> context.destinationという組み合わせがある。
    var ready = function (key) {
        if (plugins[key] && plugins[key].forEach) {
            plugins[key].forEach(function (plugin) {
                if (plugin.setPlugins) {
                    plugin.setPlugins(plugins);
                }
            });
        }
    };
    ready("base");
    ready("media");
    ready("field");
    ready("source");
    ready("output");
};
