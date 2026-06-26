import express from "express";

import {
  createOrder,
  createCustomAmountOrder,
  verifyPayment,
  getAllPayments,
  getMyPayments,
} from "../controllers/payment.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);

router.post("/create-custom-order", authMiddleware, createCustomAmountOrder);

router.post("/verify", authMiddleware, verifyPayment);

router.get("/my-payments", authMiddleware, getMyPayments);

router.get("/all", adminAuth, getAllPayments);

export default router;
