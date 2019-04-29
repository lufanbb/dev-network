import * as validator from "validator";
import { isEmpty, UserValidationError } from "./validation-util";

export const validateLogin = data => {
  const errors: UserValidationError["errors"] = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
