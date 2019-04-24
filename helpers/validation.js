const { isEmpty } = require("lodash");
const validator = require("validator");

export const contactValidation = data => {
  let errors = {};
  if (!data.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!data.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!data.phoneNumber || !validator.isMobilePhone(data.phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const messageValidation = data => {
  let errors = {};

  if (!data.message) {
    errors.message = "Message field is required";
  }

  if (!data.sender || !validator.isMobilePhone(data.sender)) {
    errors.sender = "Phone number is needed to send a message";
  }

  if (!data.receiver || !validator.isMobilePhone(data.receiver)) {
    errors.receiver =
      "Phone number of the person you would like to send a message to is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
