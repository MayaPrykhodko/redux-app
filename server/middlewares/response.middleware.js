import { ValidationMiddlewareError } from "./validation.middleware.error.js";
import { LoginError } from "./validation.middleware.error.js";

const responseMiddleware = (req, res, next) => {
  if (!res.err) {
    if (res.data) {
      res.status(200).json(res.data);
    } else {
      res.status(404).json({ error: true, message: "Data cannot be found" });
    }
  }
  else if (res.err instanceof ValidationMiddlewareError) {
    res.status(400).json({ error: true, message: res.err.message });
  } else if (res.err instanceof LoginError) {
    res.status(401).json({ error: true, message: "Invalid username or password" });
  } else {
    res.status(500).json({ error: true, message: res.err.message });
  }
  next();
};

export { responseMiddleware };