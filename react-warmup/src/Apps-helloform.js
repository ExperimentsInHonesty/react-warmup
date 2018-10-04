import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
console.log("running App.js!");
class App extends Component {
  state = {
    inputText: "" //this is a made up variable name, nothing special
  };

  handleInputChange = event => {
    console.log("handle input change");
    this.setState({ inputText: event.target.value });
  };

  render() {
    console.log("rendering!");

    let message = null;
    if (this.state.inputText) {
      if (this.state.inputText == "hello") {
        message = <h1>Hello!</h1>;
      } else {
        message = <div>keep trying</div>;
      }
    }

    return (
      <div>
        <div>
          Type something:
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
        </div>
        <div>You Typed: {this.state.inputText}</div>
        {message}
      </div>
    );
  }
}

export default App;
