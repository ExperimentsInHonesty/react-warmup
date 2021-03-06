import React from "react";
import axios from "axios";

console.log("running Register.js!");

class Register extends React.Component {
  state = {
    firstName: {
      value: "",
      isValid: false,
      messageText: ""
    },
    lastName: {
      value: "",
      isValid: false,
      message: ""
    },
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
    passwordConfirm: {
      value: "",
      isValid: false,
      message: ""
    },
    success: false,
    error: false
  };

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

  validatePasswordConfirm = pass2 => {
    return {
      validStatus: this.state.password.value === pass2,
      notValidMessage:
        "password in this field needs to match the above password"
    };
  };

  validateAllOtherFields = other => {
    return {
      validStatus: other.length >= 2 && other.length <= 100,
      notValidMessage: "must have 2 characters"
    };
  };

  validateAllFields = (typeOfItem, valueOfItem) => {
    if (typeOfItem === "email") {
      return this.validateEmail(valueOfItem);
    } else if (typeOfItem === "password") {
      return this.validatePassword(valueOfItem);
    } else if (typeOfItem === "passwordConfirm") {
      return this.validatePasswordConfirm(valueOfItem);
    } else {
      return this.validateAllOtherFields(valueOfItem);
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

  handleRegisterClicked = () => {
    //get the values
    //make a post with axios
    //put a sucess or failure message on screen

    axios
      .post("/api/users/register", {
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        email: this.state.email.value,
        password: this.state.password.value,
        passwordConfirm: this.state.passwordConfirm.value
      })
      .then(response => {
        this.setState({ success: true, error: false });
        // this.clearForm();
        this.props.history.push("/login");
        //this needs to push you to register form next
      })
      .catch(error => this.setState({ success: false, error: true }));
  };

  clearForm = () => {
    this.setState({
      firstName: {
        ...this.firstName,
        value: ""
      },
      lastName: {
        ...this.lastName,
        value: ""
      },
      email: {
        ...this.email,
        value: ""
      },
      password: {
        ...this.password,
        value: ""
      },
      passwordConfirm: {
        ...this.passwordConfirm,
        value: ""
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          First Name:
          <input
            type="text"
            value={this.state.firstName.value}
            name="firstName"
            onChange={this.handleInputChange}
          />
          {this.state.firstName.value.length > 0 &&
            this.state.firstName.value.length < 3 &&
            !this.state.firstName.isValid && (
              <span style={{ color: "red" }}>
                {this.state.firstName.message}
              </span>
            )}
        </div>
        <div>
          Last Name:
          <input
            type="text"
            value={this.state.lastName.value}
            name="lastName"
            onChange={this.handleInputChange}
          />
          {this.state.lastName.value.length > 0 &&
            this.state.lastName.value.length < 3 &&
            !this.state.lastName.isValid && (
              <span style={{ color: "red" }}>
                {this.state.lastName.message}
              </span>
            )}
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
        <div>
          {" "}
          Password Confirmation
          <input
            type="text"
            value={this.state.passwordConfirm.value}
            name="passwordConfirm"
            onChange={this.handleInputChange}
          />
          {this.state.passwordConfirm.value.length > 0 &&
            !this.state.passwordConfirm.isValid && (
              <span style={{ color: "red" }}>
                {this.state.passwordConfirm.message}
              </span>
            )}
        </div>
        <button
          disabled={
            !this.state.firstName.isValid ||
            !this.state.lastName.isValid ||
            !this.state.email.isValid ||
            !this.state.password.isValid ||
            !this.state.passwordConfirm.isValid
          }
          onClick={this.handleRegisterClicked}
        >
          {" "}
          Register
        </button>
        <div>
          {this.state.success && <h2 style={{ color: "green" }}>Success!</h2>}
          {this.state.error && <h2 style={{ color: "red" }}>Try Again!</h2>}
        </div>
      </div>
    );
  }
}
export default Register;
