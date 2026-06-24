import express from "express";

import tipController from "../controllers/tip.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router =
  express.Router();

router.post(
  "/",
  adminAuth,
  tipController.createTip
);

router.get(
  "/",
  tipController.getAllTips
);

router.get(
  "/:id",
  tipController.getTipById
);

router.put(
  "/:id",
  adminAuth,
  tipController.updateTip
);

router.delete(
  "/:id",
  adminAuth,
  tipController.deleteTip
);

export default router;