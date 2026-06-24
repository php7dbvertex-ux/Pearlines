import express from "express";

import faqController from "../controllers/faq.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, faqController.createFAQ);

router.get("/", faqController.getAllFAQs);

router.get("/:id", faqController.getFAQById);

router.put("/:id",adminAuth, faqController.updateFAQ);

router.delete("/:id",adminAuth, faqController.deleteFAQ);

export default router;
