import React from "react";

class Editor extends React.Component {
  state = {
    inputText: ""
  };

  handleInputChange = element => {
    this.setState({ inputText: element.target.value });
  };
  render() {}
}

export default Editor;
