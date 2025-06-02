import express from "express";
import {
  signup,
  login,
  logout,
  onboard,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
// User Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/onboard", protectRoute, onboard);

router.get("/me", protectRoute, (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: "User Fetched Successfully",
      user: req.user,
    });
});

export default router;
