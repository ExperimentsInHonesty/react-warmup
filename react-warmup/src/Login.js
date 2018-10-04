import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    success: false,
    error: false,

    email_isValid: false,
    password_isValid: false
  };

  componentDidMount() {
    // anything you put here in componentDidMount will happen
    // IMMEDIATELY when the component appears in the DOM
  }

  handleEmailChange = e => {
    const email = e.target.value;
    let email_isValid = false;
    if (email.length >= 2 && email.length <= 100) {
      email_isValid = true;
    }
    //this.setState({ email: email, email_isValid: email_isValid });
    this.setState({ email, email_isValid });
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    let password_isValid = false;
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
        password
      )
    ) {
      password_isValid = true;
    }

    this.setState({ password, password_isValid });
  };

  handleLoginClicked = () => {
    // get the email and the password
    // make a post with axios
    // if success, put a nice message on the screen
    // if failure, put a bad message on the screen

    axios
      .post("/api/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => this.setState({ success: true, error: false }))
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    return (
      <div>
        <div>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          {!this.state.email_isValid && (
            <span style={{ color: "red" }}>
              Email must be 2 to 100 characters
            </span>
          )}
        </div>
        <div>
          Password:
          <input
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          {!this.state.password_isValid && (
            <span style={{ color: "red" }}>
              One upper, one lower, one number, one symbol, 8 characters
            </span>
          )}
        </div>
        <button
          disabled={!this.state.email_isValid || !this.state.password_isValid}
          onClick={this.handleLoginClicked}
        >
          Log In
        </button>
        <div>
          {this.state.success && <h2 style={{ color: "green" }}>Success!</h2>}
          {this.state.error && <h2 style={{ color: "red" }}>bad!</h2>}
        </div>
      </div>
    );
  }
}

export default Login;
