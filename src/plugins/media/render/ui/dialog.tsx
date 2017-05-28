import * as React          from "react";
import * as ReactDOM       from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

import {Media} from "..";

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

export var dialog = (media:Media) => {
  var plugins = media._refSourcePlugins();
  // このダイアログで、新しいソースを選択する方向で調整していく
  class Dialog extends React.Component<{}, {}> {
    state = {
      showDialog:true,
      index:0
    };
    constructor() {
      super();
      this._close = this._close.bind(this);
      this._create = this._create.bind(this);
      this._change = this._change.bind(this);
    }
    public _close() {
      this.setState({showDialog:false});
    }
    public _create() {
      var plugin = plugins[this.state.index];
      var newSource = plugin.createNewSource();
      if(newSource != null) {
        media._addSource(newSource);
      }
      this._close();
    }
    public _change(item) {
      this.setState({index:item.target.value});
    }
    public render() {
      return (
        <Modal show={this.state.showDialog} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>NewSource</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" placeholder="select" onChange={this._change}>
                {
                  plugins.map(function(plugin, i) {
                    return <option value={i} key={i}>{plugin.name}</option>
                  })
                }
                </FormControl>
              </FormGroup>
            </Form>
            {/* この部分に必要があれば各pluginのpreviewを表示する感じで */}
            {(
              (target) => {
                if(this.state.showDialog && target != null) {
                  var Component = target.refPickupComponent();
                  if(Component != null) {
                    return <Component />
                  }
                }
                return <div />;
              }
            )(plugins[this.state.index])}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._create}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  ReactDOM.render(
    <Dialog />,
    document.getElementById("dialog")
  );
}
