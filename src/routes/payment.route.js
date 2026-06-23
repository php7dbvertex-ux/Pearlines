import express from "express";

import {
  createOrder,
  verifyPayment,
  getAllPayments,
  getMyPayments,
} from "../controllers/payment.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  createOrder
);

router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);

router.get(
  "/my-payments",
  authMiddleware,
  getMyPayments
);

router.get(
  "/all",
 
  getAllPayments
);

export default router;