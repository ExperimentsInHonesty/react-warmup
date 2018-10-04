import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const names = ["Dan", "John", "Gregorio"];

    return (
      <div>
        <ol>
          {names.map(name => (
            <li>{name}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
