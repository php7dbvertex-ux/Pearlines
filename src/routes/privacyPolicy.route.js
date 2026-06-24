import express from "express";

import privacyPolicyController from "../controllers/privacyPolicy.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router =
  express.Router();

router.get(
  "/",
  privacyPolicyController.getPrivacyPolicy
);

router.put(
  "/",
  adminAuth,
  privacyPolicyController.updatePrivacyPolicy
);

export default router;