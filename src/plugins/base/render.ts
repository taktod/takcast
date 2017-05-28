import {IBasePlugin} from "takcast.interface";
import {IPlugin} from "takcast.interface";
import * as electron from "electron";

/**
 * 全体で共有するデータを保持するBaseプラグイン
 */
class Base implements IBasePlugin {
  /**
   * 名前
   */
  public name = "base";
  /**
   * 動作タイプ
   */
  public type = "base";
  /**
   * 共有するAudioContext
   */
  private context:AudioContext;
  /**
   * 共有するAudioNode
   * ここにあてがうと、音がでなくなる
   */
  private devnullNode:GainNode;
  private gainNode:GainNode;
  public setPlugins(plugins:{[key:string]:Array<IPlugin>}):void {
    this.context = new AudioContext();
    this.devnullNode = this.context.createGain();
    this.devnullNode.gain.value = 0.0;
    this.devnullNode.connect(this.context.destination);
  }
  /**
   * audioContextを参照する
   * @return AudioContext
   */
  public refAudioContext():AudioContext {
    return this.context;
  }
  /**
   * 接続すると音を出さないAudioNodeを参照する
   * @return AudioNode
   */
  public refDevnullNode():AudioNode {
    return this.devnullNode;
  }
  /**
   * electron動作であるか確認してみる。
   */
  public isElectron():boolean {
    return electron != null;
  }
}

export var _ = new Base();