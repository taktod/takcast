import * as React          from "react";
import * as ReactDOM       from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

var Panel = ReactBootstrap.Panel;

import {Media} from "..";
import {MediaFieldInterface} from "..";

export var main = (media:Media) => {
  if(media._refMediaPlugin() != null) {
    var BodyComponent = media._refMediaPlugin().refBodyComponent();
    class Main extends React.Component<{}, {}> implements MediaFieldInterface {
      state = {height:window.innerHeight};
      constructor() {
        super();
      }
      public updateHeight(height:number):void {
        this.setState({height:height});
      }
      public render() {
        media._setMain(this);
        return (
          <Panel style={{height:this.state.height}}>
            <BodyComponent />
          </Panel>
        );
      }
    }
    ReactDOM.render(
      <Main />,
      document.getElementById("body")
    );
  }
}
