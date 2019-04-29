import * as validator from "validator";
import { isEmpty, UserValidationError } from "./validation-util";

export const validateRegistration = data => {
  const errors: UserValidationError["errors"] = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmPassword = isEmpty(data.confirmPassword)
    ? ""
    : data.confirmPassword;

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name length needs to be between 2 and 30.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email format is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password length mush be at least 6 and at most 30";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Confirm password didn't match password";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
