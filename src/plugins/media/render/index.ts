// mediaのデータ出力を実施するplugin
// ここでは、真ん中にある、データ表示の部分のコントロール
// 左側のパレットの部分のコントロール
// パレット追加時のダイアログのコントロール
// 等を実施する予定
import {IPlugin} from "takcast.interface";
import {IBasePlugin} from "takcast.interface";
import {IFieldPlugin} from "takcast.interface";
import {ISource} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";
import {ISourcePlugin} from "takcast.interface";
import {IOutputPlugin} from "takcast.interface";

import {palette} from "./ui/palette";
import {main} from "./ui/main";
import {dialog} from "./ui/dialog";

export interface MediaFieldInterface {
  updateHeight(height:number):void;
}

export class Media implements IFieldPlugin {
  public name = "media";
  public type = "field";

  // 今回は描画合成場所を複数にはしなかった。複数にすると出力によっていろいろと調整できるが、UIがかなり複雑になるので、やらない方が吉だろう。
  private mediaPlugin:IMediaPlugin;
  // sourceとして利用するのはSourcePlugin
  private sourcePlugins:Array<ISourcePlugin>;
  // 全体の音声のcontext
  private sources:Array<ISource>;
  private index:number;
  private outputPlugins:Array<IOutputPlugin>;
  private palette:MediaFieldInterface;
  private main:MediaFieldInterface;
  constructor() {
    this.palette = null;
    this.main = null;
    this.sourcePlugins = [];
    this.outputPlugins = [];
    this.sources = [];
    this.index = -1;
    this.mediaPlugin = null;
  }
  public _setPalette(palette:MediaFieldInterface) {
    this.palette = palette;
  }
  public _setMain(main:MediaFieldInterface) {
    this.main = main;
  }
  public setPlugins(plugins:{[key:string]:Array<IPlugin>}):void {
    // それぞれのpluginの参照をとっておく。
    if(plugins["media"] && plugins["media"].forEach) {
      // 今回は全部ではなく、mediaPluginの一番最後だけ採用する形にすればいいと思う。
      var index = plugins["media"].length - 1;
      this.mediaPlugin = plugins["media"][index] as IMediaPlugin;
      // ここで利用するmediaPluginが確定される。
    }
    if(plugins["source"] && plugins["source"].forEach) {
      plugins["source"].forEach((plugin) => {
        this.sourcePlugins.push(plugin as ISourcePlugin);
      });
    }
    if(plugins["output"] && plugins["output"].forEach) {
      plugins["output"].forEach((plugin) => {
        this.outputPlugins.push(plugin as IOutputPlugin);
      });
    }
    var basePlugin = plugins["base"][0] as IBasePlugin;

    // 利用するmediaPluginが確定したので、いろいろしておく。
    // 音声を出力に接続しておく。
    if(this.mediaPlugin != null) {
      this.mediaPlugin.refNode().connect(basePlugin.refAudioContext().destination);
      this.outputPlugins.forEach((plugin) => {
        plugin.onChangeActiveMedia(this.mediaPlugin);
      });
    }
    // 描画を更新しておく
    this.render();
  }
  public _refMediaPlugin():IMediaPlugin {
    return this.mediaPlugin;
  }
  public _refSourcePlugins():Array<ISourcePlugin> {
    return this.sourcePlugins;
  }
  public _refSources():Array<ISource> {
    return this.sources;
  }
  private _refActiveSource():ISource {
    if(this.index == -1) {
      return null;
    }
    else {
      return this.sources[this.index];
    }
  }
  public _refActiveIndex():number {
    return this.index;
  }
  public _setActiveSource(index:number):void {
    this.index = index;
    this.mediaPlugin.onChangeActiveSource(this._refActiveSource());
  }
  public _updateSize():void {
    // サイズが変更になったときにcallしようと思う
    // こっち側で管理しなければならないが・・・どうするかね。
    var height = window.innerHeight;
    var fo = document.getElementById("footer").getElementsByClassName("navbar");
    if(fo.length != 0) {
      height -= fo[0].clientHeight;
    }
    var he = document.getElementById("header").getElementsByClassName("navbar");
    if(he.length != 0) {
      height -= he[0].clientHeight;
    }
    height -= 20;
    if(this.palette != null) {
      this.palette.updateHeight(height);
    }
    if(this.main != null) {
      this.main.updateHeight(height);
    }
  }
  public render():void {
    palette(this);
    main(this);
  }
  public renderDialog():void {
    dialog(this);
  }

  // あと別で必要になりそうなもの。
  // 現在Activeなsourceを削除する動作
  public _deleteSource(source:ISource) {
    var index = this.sources.indexOf(source);
    if(index >= 0) {
      // sourcesから撤去
      this.sources.splice(index, 1);
      // データを解放
      source.release();
      // パレットの部分、再描画する。
      palette(this);
    }
  }
  // sourceが追加されたときの動作
  public _addSource(source:ISource):void {
    // 増やす
    this.sources.push(source);
    // 通知する。
    this.mediaPlugin.onAddSource(source);
    // パレットの更新を実施する。
    // 前のプログラムの場合は、別のタブに移動している状態でpaletteの更新を実施すると壊れたが、今回の動作では、paletteを別に移動することがないので、これでOKのはず
    palette(this);
  }
}

export var _ = new Media();