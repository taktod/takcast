import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

var Nav     = ReactBootstrap.Nav;
var Navbar  = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NCollapse = Navbar.Collapse as any;

var Form = ReactBootstrap.Form;
var FormControl = ReactBootstrap.FormControl;

import {Output} from "..";

export var footer = (output:Output) => {
  var plugins = output._refOutputPlugins();
  var footer = document.getElementById("footer");
  class Footer extends React.Component<{}, {}> {
    state = {
      index:0
    };
    constructor() {
      super();
      this._updatePadding = this._updatePadding.bind(this);
      this._change = this._change.bind(this);
    }
    private _updatePadding() {
      output._onUpdateSize();
//      document.body.style["padding-bottom"] = (footer.getElementsByClassName("navbar")[0].clientHeight + 10) + "px";
    }
    private _change(item) {
      this.setState({index:item.target.value});
    }
    public componentDidMount() {
      this._updatePadding();
      window.addEventListener("resize", this._updatePadding);
    }
    public componentDidUpdate() {
      setTimeout(this._updatePadding, 100);
    }
    public render() {
      return (
        <Navbar collapseOnSelect fixedBottom>
          <Navbar.Toggle/>
          <NCollapse onEntered={this._updatePadding} onExited={this._updatePadding}>
            <Navbar.Text>
            <Form>
              <FormControl componentClass="select" onChange={this._change}>
                {
                  plugins.map(function(plugin, i) {
                    return <option value={i} key={i}>{plugin.name}</option>
                  })
                }
              </FormControl>
            </Form>
          </Navbar.Text>
          {/* この部分に必要があれば、各pluginのsettingを表示する感じ */}
          {(
            (target) => {
              if(target != null) {
                var Component = target.refSettingComponent();
                if(Component != null) {
                  return <Component />
                }
              }
              return <div />
            }
          )(plugins[this.state.index])}
          </NCollapse>
        </Navbar>
      );
    }
  }
  ReactDOM.render(
    <Footer />,
    footer
  );
}