import React from "react";

class Editor extends React.Component {
  state = {
    inputText: ""
  };

  handleInputChange = e => {
    console.log("setting state to " + e.target.value);

    this.setState({ inputText: e.target.value }, () => {
      console.log("state.inputText= " + this.state.inputText);
    });

    // send up to the parent
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div style={{ border: "2px solid blue" }}>
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Editor;
