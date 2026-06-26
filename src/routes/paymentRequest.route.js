import express from "express";

import adminAuth from "../middlewares/adminAuth.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  createPaymentRequest,
  getMyPaymentRequests,
  getAllPaymentRequests,
} from "../controllers/paymentRequest.controller.js";

const router =
  express.Router();

router.post(
  "/create",
  adminAuth,
  createPaymentRequest
);

router.get(
  "/my",
  authMiddleware,
  getMyPaymentRequests
);

router.get(
  "/all",
  adminAuth,
  getAllPaymentRequests
);

export default router;