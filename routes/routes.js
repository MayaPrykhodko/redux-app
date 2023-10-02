import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as tripRoutes } from "./tripRoutes.js";
import { router as bookingRoutes } from "./bookingRoutes.js";

const initRoutes = (app) => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/trips", tripRoutes);
  app.use("/api/v1/bookings", bookingRoutes);
  app.use("/api/v1/auth", authRoutes);
};

export { initRoutes };