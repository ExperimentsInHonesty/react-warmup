import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: {
      value: "",
      isValid: false,
      message: ""
    },
    password: {
      value: "",
      isValid: false,
      message: ""
    },

    success: false,
    error: false
  };

  componentDidMount() {
    // anything you put here in componentDidMount will happen
    // IMMEDIATELY when the component appears in the DOM
  }

  validateEmail = email => {
    return {
      validStatus: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email),
      notValidMessage: "email not complete"
    };
  };

  validatePassword = password => {
    return {
      validStatus: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
        password
      ),
      notValidMessage:
        "Password must contain an upper & lower case letter, a digit, a symbol and a total of 8 characters"
    };
  };

  validateAllFields = (typeOfItem, valueOfItem) => {
    if (typeOfItem === "email") {
      return this.validateEmail(valueOfItem);
    } else {
      return this.validatePassword(valueOfItem);
    }
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    let isValid = false;
    isValid = this.validateAllFields(name, value);
    this.setState({
      [name]: {
        ...this.state[name],
        value,
        isValid: isValid.validStatus,
        message: isValid.notValidMessage
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
      .then(response => {
        this.setState({ success: true, error: false });
        // this.clearForm();
        this.props.history.push("/home");
      })
      .catch(error => this.setState({ success: false, error: true }));
  };

  clearForm = () => {
    this.setState({
      email: {
        ...this.email,
        value: ""
      },
      password: {
        ...this.password,
        value: ""
      }
    });
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
            placeholder="email@email.com"
            onChange={this.handleInputChange}
          />
          {this.state.email.value.length > 0 &&
            !this.state.email.isValid && (
              <span style={{ color: "red" }}>{this.state.email.message}</span>
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
          {this.state.password.value.length > 0 &&
            !this.state.password.isValid && (
              <span style={{ color: "red" }}>
                {this.state.password.message}
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
          {this.state.error && (
            <h2 style={{ color: "red" }}>
              Email/Pass combo rejected - not going to tell you why, because we
              don't know
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
