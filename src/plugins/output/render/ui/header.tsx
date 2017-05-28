// ヘッダー部をコントロールする。
// ここに音声出力動作を追加しとくことにする。
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

var Nav     = ReactBootstrap.Nav;
var Navbar  = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NCollapse = Navbar.Collapse as any;

import {Output} from "..";

export var header = (output:Output) => {
  var header = document.getElementById("header");
  class Header extends React.Component<{}, {}> {
    constructor() {
      super();
      this.volume = this.volume.bind(this);
      this._updatePadding = this._updatePadding.bind(this);
    }
    public volume(item) {
      output._setVolume(item.target.value);
    }
    private _updatePadding() {
      output._onUpdateSize();
      document.body.style["padding-top"] = (header.getElementsByClassName("navbar")[0].clientHeight + 10) + "px";
    }
    public componentDidMount() {
      this._updatePadding();
      window.addEventListener("resize", this._updatePadding);
    }
    public render() {
      return (
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>TakCast</Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <NCollapse onEntered={this._updatePadding} onExited={this._updatePadding}>
          <Navbar.Text pullRight>
            Volume
            <input type="range" defaultValue="100" onChange={this.volume}/>
          </Navbar.Text>
          </NCollapse>
        </Navbar>
      );
    }
  }
  ReactDOM.render(
    <Header />,
    header
  );
}