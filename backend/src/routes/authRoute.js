import express, { Router } from "express";
import { getProfile, loginUser, signupUser, logoutUser } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", protectRoute, getProfile);
router.post("/logout", logoutUser);

export default router;
