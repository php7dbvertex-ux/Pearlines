import express from "express";

import adminAuth from "../middlewares/adminAuth.js";

import {
  setPaymentConfig,
  getPaymentConfig,
} from "../controllers/paymentConfig.controller.js";

const router = express.Router();

// ADMIN

router.post(
  "/set",
  adminAuth,
  setPaymentConfig
);

// USER

router.get(
  "/details",
  getPaymentConfig
);

export default router;