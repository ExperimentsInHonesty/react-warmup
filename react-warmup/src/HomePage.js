import React from "react";
import axios from "axios";

class HomePage extends React.Component {
  state = {
    firstName: "please log in!",
    loggedIn: false,
    success: false,
    error: false
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = () => {
    axios
      .get("/api/tests/auth/current")

      .then(response => {
        console.log(response);
        this.setState({
          firstName: response.data.item.user.name,
          loggedIn: true
        });
      })
      .catch(error => this.setState({ success: false, error: true }));
  };

  handleLogoutClicked = () => {
    //1. delete cookie
    axios
      .get("/api/tests/auth/logout")
      .then(response => {
        this.setState({
          success: true,
          error: false
        });
        this.props.history.push("/login");
      })

      .catch(error => this.setState({ success: false, error: true }));

    //2. reset firstName back to empty
    this.setState({
      firstName: "please log in!"
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome, {this.state.firstName}</h1>
        {this.state.loggedIn && (
          <button onClick={this.handleLogoutClicked}>Log Out</button>
        )}
        {/* <button onClick={this.handleLogoutClicked}>Log Out</button> */}
      </div>
    );
  }
}

export default HomePage;
