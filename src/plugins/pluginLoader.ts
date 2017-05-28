import {IPlugin} from "takcast.interface";

// pluginがそれぞれ読み込まれたら配列に保存しておく。
export var setPlugin = (plugins:{[key:string]:Array<IPlugin>}, plugin:IPlugin) => {
  if(typeof(plugins[plugin.type]) == "undefined") {
    plugins[plugin.type] = [];
  }
  plugins[plugin.type].push(plugin);
}

// すべてのpluginの読み込みが終わったらplugin参照できるチャンスを与えます。
export var startPlugins = (plugins:{[key:string]:Array<IPlugin>}) => {
  // これはpluginsの中身はその順番になるけど、keysのkeyがどういう順番になるかは不明
  // とりあえずbase、media、field、sourceといった順番になってた方が都合がよさそう。
  // mediaFieldPluginの初期化の部分で、保持しているmediaPluginのaudioNode -> context.destinationという組み合わせがある。
  var ready = (key) => {
    if(plugins[key] && plugins[key].forEach) {
      plugins[key].forEach((plugin) => {
        if(plugin.setPlugins) { // setPluginsが定義されている場合だけ実行
          plugin.setPlugins(plugins);
        }
      });
    }
  }
  ready("base");
  ready("media");
  ready("field");
  ready("source");
  ready("output");
}
