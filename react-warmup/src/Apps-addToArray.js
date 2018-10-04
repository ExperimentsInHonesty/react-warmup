import React, { Component } from "react";
import "./App.css";

// JSX is what appears to be the html text.

console.log("running App.js");

class App extends Component {
  state = {
    inputText: "", // this is a made up variable name, nothing special
    items: []
  };

  handleInputChange = event => {
    this.setState({ inputText: event.target.value });
  };

  handleClick = () => {
    // take what's in the state and put it into the array
    // 1. Build up new array with everything from existing array '...this.state.items', plus the input text
    const items = [...this.state.items, this.state.inputText];
    // the following two lines do the same thing as the prior. Whats the benifit?
    // const items = [...this.state.items];
    // items.push(this.state.inputText);
    // 2. Put new array into the state
    this.setState({ items: items });
  };

  render() {
    return (
      <div>
        <div>
          Type something:
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleClick}>Add</button>
        </div>
        {this.state.items.map(item => (
          <div>{item}</div>
        ))}
      </div>
    );
  }
}

export default App;
