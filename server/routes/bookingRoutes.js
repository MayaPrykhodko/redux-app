import { Router } from "express";
import { bookingService } from "../services/bookingService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createBookingValid } from "../middlewares/booking.validation.middleware.js";
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
          const userId = authData.user.id;
          res.data = bookingService.getAllById(userId);
        }
      });
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
          res.data = bookingService.findById(id);
        }
      });
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  ensureToken,
  createBookingValid,
  (req, res, next) => {
    try {
      if (req.valid) {
      jwt.verify(req.token, 'your-secret-key', (err, authData) => {
        if (!err) {
            res.data = bookingService.create(req.body); 
        }
      });
    }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);


router.delete(
  "/:id",
  ensureToken,
  (req, res, next) => {
    try {
      jwt.verify(req.token, 'your-secret-key', (err, authData) => {
        if (!err) {
          const id = req.params.id;
          res.data = bookingService.delete(id)
        }
      });
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
