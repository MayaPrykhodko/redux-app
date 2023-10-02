import { ValidationMiddlewareError } from "./validation.middleware.error.js";
import { userService } from "../services/userService.js";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateEmail = (email) => {
  if (email.match(emailRegex)) {
    return null;
  } else {
    return new ValidationMiddlewareError('This is not a valid email format!');
  }
}

const validatePassword = (password) => {
  if (password.length > 3|| values.password.length < 20) {
    return null;
  } else {
    return new ValidationMiddlewareError('Password must contain more that 3 characters and less than 20 characters');
  }
}

function setError(error, res, req) {
  if (error) {
    res.err = error;
    req.valid = false;
  } else {
    req.valid = true;
  }
}

const createUserValid = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const existingEmail = await userService.search({email: email});
  let error;

  if (!fullName || !email || !password) {
    error = new ValidationMiddlewareError("All fields must be specified")
  } 

  if (existingEmail) {
    error = new ValidationMiddlewareError('User with the same email already exists');
  }

  error = error || validateEmail(email) || validatePassword(password);

  setError(error, res, req)
  next();
};

export { createUserValid };