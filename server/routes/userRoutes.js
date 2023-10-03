import { Router } from "express";
import { userService } from "../services/userService.js";
import { createUserValid } from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { ensureToken } from "../middlewares/token.ensure.middleware.js";
import jwt from 'jsonwebtoken';

const router = Router();


router.get(
  "/authenticated-user",
  ensureToken,
  (req, res, next) => {
    try {
      jwt.verify(req.token, 'your-secret-key', (err, data) => {
        if (!err) {
            res.data = data;
        }
      })
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/sign-up",
  createUserValid,
  (req, res, next) => {
    try {
      if (req.valid) {
        res.data = userService.create(req.body);
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };