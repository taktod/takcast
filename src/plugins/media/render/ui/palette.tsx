import * as React          from "react";
import * as ReactDOM       from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

import {Media} from "..";
import {MediaFieldInterface} from "..";

import {ISource} from "takcast.interface";

var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;

export var palette = (media:Media) => {
  // こっち側つくっていくか・・・
  // とりあえずボタンを押したときに、dialog boxを表示する動作をつくってみようと思う。
  // あとはactiveになったとき、再描画したときにscroll位置がうごくのがよくない。
  class Palette extends React.Component<{}, {}> implements MediaFieldInterface {
    state = {index:media._refActiveIndex(), height:window.innerHeight};
    constructor() {
      super();
      this.openDialog = this.openDialog.bind(this);
      this.clickList = this.clickList.bind(this);
      this.deleteSource = this.deleteSource.bind(this);
    }
    public openDialog() {
      media.renderDialog();
    }
    public clickList(item) {
      var i = parseInt(item._dispatchInstances._hostNode.name);
      if(media._refActiveIndex() == i) {
        media._setActiveSource(-1);
        this.setState({index:-1});
      }
      else {
        media._setActiveSource(i);
        this.setState({index:i});
      }
    }
    public deleteSource() {
      media._setActiveSource(-1);
      media._deleteSource(media._refSources()[this.state.index]);
    }
    public updateHeight(height:number):void {
      this.setState({height:height});
    }
    public componentDidMount() {
      media._updateSize();
    }
    public render() {
      var _pthis = this;
      media._setPalette(this);
      // これはもうこれでいいんだけど、resizeのイベントうけとりたい。
      return (
        <Panel style={{height:this.state.height}}>
          <ButtonGroup ref="btngroup">
            <Button onClick={this.openDialog}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Button>
            <Button onClick={this.deleteSource}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></Button>
          </ButtonGroup>
          <br />
          <div style={{border:"0px",padding:"0px",overflow:"scroll",height:(_pthis.state.height - 66)}}>
            {/* この部分にpaletteとして選択可能なリソースを列挙する予定 */
              // ２つずつループするようにすれば、事足りるわけか・・・なるほど
              media._refSources().map((data, i) => {
                // あとはコンポーネントの描画を実施すればよい。
                var clsname = "list-group-item col-xs-4 col-sm-4";
                if(this.state.index == i) {
                  clsname += " active";
                }
                var _pthis = this;
                var isAudio = data.refAudioNode() != null;
                class HogeComponent extends React.Component<{}, {}> {
                  // 前の値をしっておかないと・・・ということはないか・・・
                  // 毎回100に戻したらまずいかな。
                  state = {volume:data.getVolume()}
                  constructor() {
                    super();
                    this._inputVolume = this._inputVolume.bind(this);
                  }
                  public _inputVolume(item) {
                    data.setVolume(parseInt(item.target.value));
                  }
                  public componentWillUnmount() {
                    var element = data.refDisplayElement();
                    if(element) {
                      var paused = false;
                      if(element instanceof HTMLMediaElement) {
                        paused = element.paused;
                      }
                      document.body.appendChild(element);
                      element.style["display"] = "none";
                      element.style["width"] = "100px";
                      if(element instanceof HTMLMediaElement && !paused) {
                        element.play();
                      }
                      // 音声onlyの場合にmediaElementにアクセスできないのはまずいか・・・
                      // ただし、これは描画に関わってはいけないことになるわけか・・・
                    }
                  }
                  public componentDidMount() {
                    var element = data.refDisplayElement();
                    if(element) {
                      var paused = false;
                      if(element instanceof HTMLMediaElement) {
                        paused = element.paused;
                      }
                      (this.refs["media"] as HTMLElement).appendChild(element);
                      element.style["display"] = "";
                      element.style["width"] = "100%";
                      if(element instanceof HTMLMediaElement && !paused) {
                        element.play();
                      }
                    }
                    // とりあえず縦横をあわせておこうと思う。
                    element.style["height"] = (element.clientWidth * 9/16) + "px";
                  }
                  public render() {
                    return (
                      <Button ref="item"
                          className={clsname}
                          onClick={_pthis.clickList}
                          name={"" + i}
                          key={i}>
                        <div ref="media" />
                        {((isAudio) => {
                          if(isAudio) {
                            return <input type="range" onInput={this._inputVolume} defaultValue={"" + this.state.volume}></input>
                          }
                          else {
                            return <div />
                          }
                        })(isAudio)}
                      </Button>
                    )
                  }
                }
                return (
                  <HogeComponent />
                )
              })
            }
          </div>
        </Panel>
      );
    }
  }
  ReactDOM.render(
    <Palette />,
    document.getElementById("palette")
  );
}
