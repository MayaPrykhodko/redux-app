import { LoginError } from "./validation.middleware.error.js";


const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    throw new LoginError("Unauthorized");
  }
};

export { ensureToken };