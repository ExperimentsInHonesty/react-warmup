import React from "react";

console.log("running validate.js!");

class Validate extends React.Component {
  validateEmail = email =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  validatePassword = password =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
      password
    );

  validatePasswordConfirm = pass2 => this.state.password.value === pass2;

  validateAllOtherFields = other => other.length >= 2 && other.length <= 100;

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
}

export default validate;
