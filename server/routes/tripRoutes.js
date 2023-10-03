import { Router } from "express";
import { tripService } from "../services/tripService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import jwt from 'jsonwebtoken';
import { ensureToken } from "../middlewares/token.ensure.middleware.js";

const router = Router();

router.get(
  "/",
  ensureToken,
  (req, res, next) => {
    try {
      jwt.verify(req.token, 'your-secret-key', (err, authData) => {
        if (!err) {
          res.data = tripService.getAll();
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

router.get(
  "/:id",
  ensureToken,
  (req, res, next) => {
    try {
      jwt.verify(req.token, 'your-secret-key', (err, authData) => {
        if (!err) {
          const id = req.params.id;
          res.data = tripService.findById(id);
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


export { router };