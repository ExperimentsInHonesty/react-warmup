import React from "react";
import axios from "axios";
import Validate from "./Validate";

console.log("running Register.js!");

class Register extends React.Component {
  state = {
    firstName: {
      value: "",
      isValid: false
    },
    lastName: {
      value: "",
      isValid: false
    },
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    },
    passwordConfirm: {
      value: "",
      isValid: false
    },
    success: false,
    error: false
    // email_isValid: false,
    // password_isValid: false
  };

  // validateEmail = email =>
  //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  // validatePassword = password =>
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
  //     password
  //   );

  // validatePasswordConfirm = pass2 => this.state.password.value === pass2;

  // validateAllOtherFields = other => other.length >= 2 && other.length <= 100;

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

  handleInputChange = event => {
    // event.preventDefault();
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

  // handleEmailChange = event => {
  //   const email = event.target.value;
  //   let email_isValid = false;
  //   email_isValid = this.validateEmail(email);

  //   this.setState({
  //  email: email, email_isValid: true/false
  // });
  // };

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
      .then(response => this.setState({ success: true, error: false }))
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    return (
      <div>
        <Validate />
        <div>
          First Name:
          <input
            type="text"
            value={this.state.firstName.value}
            name="firstName"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          Last Name:
          <input
            type="text"
            value={this.state.lastName.value}
            name="lastName"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          Email:
          <input
            type="text"
            value={this.state.email.value}
            name="email"
            onChange={this.handleInputChange}
          />
          {!this.state.email.isValid && (
            <span style={{ color: "red" }}>
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
          {!this.state.password.isValid && (
            <span style={{ color: "red" }}>
              One upper, one lower, one number, one symbol, 8 characters
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
            // onBlur={
            //   <span style={{ color: "blue" }}>This is a test version</span>
            // }
            onChange={this.handleInputChange}
          />
          {/* {this.state.passwordConfirm.length > 0 && (
            <span style={{ color: "red" }}>
              This must match the password above
            </span>
          )} */}
          {!this.state.passwordConfirm.isValid && (
            <span style={{ color: "red" }}>
              This must match the password above
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
          {this.state.success && <h2 style={{ color: "red" }}>Try Again!</h2>}
        </div>
      </div>
    );
  }
}
export default Register;
