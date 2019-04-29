export interface UserValidationError {
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  isValid: boolean;
}

export const isEmpty = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
