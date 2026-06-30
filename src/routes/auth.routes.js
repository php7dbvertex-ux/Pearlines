import express from "express";
import {
  signup,
  login,
  forgotPasswordEmail,
  verifyEmailOtp,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password-email", forgotPasswordEmail);
router.post("/verify-email-otp", verifyEmailOtp);
router.post("/reset-password", resetPassword);

export default router;
