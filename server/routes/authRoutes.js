import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/sign-in",
  (req, res, next) => {
    try {
      const userCreds = {
        email: req.body.email,
        password: req.body.password
      }
      res.data = authService.login(userCreds);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };