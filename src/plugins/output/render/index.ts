// 出力調整用のplugin
// こっちでは、出力のコントロールと下部にある、outputコントロール動作部をコントロールする予定
// footerをこっちでコントロールしてもいいかも・・・
// そうするか・・・
// なお、outputPluginにせよ、mediaPluginにせよ、最後に選択されたものを採用することで進めようと思う。
// でも、それは実装の仕方次第か・・・
// そこからはずれた動作を実施されたら・・・あ、でもreactで描画されたところを再描画すると、あとで書いた方が有効になるか
// ということなら、特になにも考えずにつくって大丈夫っぽいな。
// 音声の出力の動作は、それ専用のpluginでコントロールしようと思う。
// headerに音声調整のがあると、どの音量を操作しているかわからなくなって、ややこしくなりそう。
// まぁあってもいいけど。
// いや、やはり全体の音量をコントロールできるほうが都合がいいか・・・

/**
 * 下部のrtmpの部分、codecはちょくちょく変更するものではないので、隠れるようにしておきたい。
 * rtmpなら基本h264 / aacだと 接続先も情報がある形にしておいて、クリックすると変更するためのダイアログがでてくる感じでいいと思う。
 *  もしくはその場でactiveになって入力できるような感じで
 * webmだったらvp8 / opusだし、他の余計なのは、見えなくていいと思う。
 * あまりややこしいuiにするといろいろと破綻しそう。
 * 
 * ただし、uiに凝るあまりプログラムが止まると本末転倒なので、そこまでこだわって簡素にはしない感じで。
 * bootstrapの動作のデフォに従う感じかね。
 */
import {IPlugin} from "takcast.interface";
import {IFieldPlugin} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";
import {IOutputPlugin} from "takcast.interface";

import {Media} from "../../media/render";

import {header} from "./ui/header";
import {footer} from "./ui/footer";

// こいつが、mediaPluginをすべて管理しておかないといけない。
// volumeが変更したら、その値をmediaPluginに通知しないといけない。
export class Output implements IFieldPlugin {
  public name:string = "output";
  public type:string = "field"; // これはfieldでありoutputNodeでもあるというのは可能といえば可能ですね。
  private mediaFieldPlugin:Media;
  private mediaPlugins:Array<IMediaPlugin>;
  private outputPlugins:Array<IOutputPlugin>;
  // 現在有効になっているmediaPluginを知る必要がある。
  // 現在保持してるoutputPluginも知る必要がある。
  public setPlugins(plugins:{[key:string]:Array<IPlugin>}):void {
    this.mediaPlugins = [];
    this.outputPlugins = [];
    // pluginが全部そろったときにcallされる動作
    // ここから、mediaPluginを取り出してそのaudioContextをrefとして保持しておかないといけない。
    // それくらいかな。
    // このタイミングで自分からfooterの内容を更新しにいくか・・・
    // そして自分の中のイベントでfooterの再描画が必要になったら、自分でrenderを再度実施するでいいか

    // 元々の動作ではactiveなデータを表示したかったのでmediaPluginを参照していた。
    // 今回はmediaの表示部を隠すことはないので、必要ないかな。
    // baseからaudioContextとdevnullNodeだけ参照してたら十分なきがする。
    if(plugins["field"] && plugins["field"].forEach) {
      plugins["field"].forEach((plugin) => {
        if(plugin["_updateSize"]) {
          this.mediaFieldPlugin = plugin as Media;
        }
      });
    }
    if(plugins["media"] && plugins["media"].forEach) {
      plugins["media"].forEach((plugin) => {
        this.mediaPlugins.push(plugin as IMediaPlugin);
      });
    }
    if(plugins["output"] && plugins["output"].forEach) {
      plugins["output"].forEach((plugin) => {
        this.outputPlugins.push(plugin as IOutputPlugin);
      });
    }
    this.render();
  }
  // 描画せよと命令されたときの動作
  public render():void {
    header(this);
    footer(this);
  }
  public _setVolume(number):void {
    this.mediaPlugins.forEach((plugin) => {
      plugin.setVolume(number);
    })
  }
  public _refOutputPlugins() {
    return this.outputPlugins;
  }
  public _onUpdateSize() {
    // サイズの更新を実施する
    this.mediaFieldPlugin._updateSize();
  }
}

export var _ = new Output();