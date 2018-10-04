import React, { Component } from "react";
import MyMessage from "./MyMessage";
import "./App.css";

// JSX is what appears to be the html text.

console.log("running App.js");

class App extends Component {
  render() {
    console.log("render");

    return (
      <div>
        <MyMessage message="This is a new message" />
      </div>
    );
  }
}

export default App;
