import React, { Component } from "react";
import { Button } from "antd";
// import Button from "antd/es/button";
import { render } from "react-dom";

render(
    <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
    </div>,
    document.getElementById("app")
);
