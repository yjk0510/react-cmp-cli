import React, { Component } from "react";
import "./index.scss";
import { render } from "react-dom";
export class Demo extends Component {
    render() {
        return <div>Demo</div>;
    }
}

export default Demo;

render(<Demo />, document.getElementById("app"));
