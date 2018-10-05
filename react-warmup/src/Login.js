import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    },

    success: false,
    error: false
  };

  componentDidMount() {
    // anything you put here in componentDidMount will happen
    // IMMEDIATELY when the component appears in the DOM
  }

  validateEmail = email =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  validatePassword = password =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
      password
    );

  // validatePasswordConfirm = pass2 => this.state.password.value === pass2;

  validateAllOtherFields = other => other.length >= 2 && other.length <= 100;

  validateAllFields = (typeOfItem, valueOfItem) => {
    if (typeOfItem === "email") {
      return this.validateEmail(valueOfItem);
    } else {
      return this.validatePassword(valueOfItem);
    }
  };

  // validateAllFields = (typeOfItem, valueOfItem) => {
  //   if (typeOfItem === "email") {
  //     return this.validateEmail(valueOfItem);
  //   } else if (typeOfItem === "password") {
  //     return this.validatePassword(valueOfItem);
  //   } else if (typeOfItem === "passwordConfirm") {
  //     return this.validatePasswordConfirm(valueOfItem);
  //   } else {
  //     return this.validateAllOtherFields(valueOfItem);
  //   }
  // };

  // handleEmailChange = e => {
  //   const email = e.target.value;
  //   let email_isValid = false;
  //   if (email.length >= 2 && email.length <= 100) {
  //     email_isValid = true;
  //   }
  //   //this.setState({ email: email, email_isValid: email_isValid });
  //   this.setState({ email, email_isValid });
  // };

  // handlePasswordChange = e => {
  //   const password = e.target.value;
  //   let password_isValid = false;
  //   if (
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
  //       password
  //     )
  //   ) {
  //     password_isValid = true;
  //   }

  //   this.setState({ password, password_isValid });
  // };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    let isValid = false;
    isValid = this.validateAllFields(name, value);
    this.setState({
      [name]: {
        ...this.state[name],
        value,
        isValid
      }
    });
  };

  handleLoginClicked = () => {
    // get the email and the password
    // make a post with axios
    // if success, put a nice message on the screen
    // if failure, put a bad message on the screen

    axios
      .post("/api/users/login", {
        email: this.state.email.value,
        password: this.state.password.value
      })
      .then(response => this.setState({ success: true, error: false }))
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    return (
      <div>
        <div>
          <h2>Please login</h2>
        </div>
        <div>
          Email:
          <input
            type="text"
            value={this.state.email.value}
            name="email"
            onChange={this.handleInputChange}
          />
          {!this.state.email_isValid && (
            <span style={{ color: "gray" }}>
              Email must be 2 to 100 characters
            </span>
          )}
        </div>
        <div>
          Password:
          <input
            type="text"
            value={this.state.password.value}
            name="password"
            onChange={this.handleInputChange}
          />
          {!this.state.password_isValid && (
            <span style={{ color: "gray" }}>
              One upper, one lower, one number, one symbol, 8 characters
            </span>
          )}
        </div>
        <button
          disabled={!this.state.email.isValid || !this.state.password.isValid}
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
