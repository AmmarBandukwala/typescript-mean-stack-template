import express from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req: any, res: any) =>
  res.send("OK")
);

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
