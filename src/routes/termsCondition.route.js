import express from "express";

import termsConditionController from "../controllers/termsCondition.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/", termsConditionController.getTermsCondition);

router.put("/", adminAuth, termsConditionController.updateTermsCondition);

export default router;
