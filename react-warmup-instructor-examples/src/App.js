import React, { Component } from "react";
import Login from "./Login";

console.log("running App.js!");

class App extends Component {
  render() {
    console.log("rendering App");

    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
