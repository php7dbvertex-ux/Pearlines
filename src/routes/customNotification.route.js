import express from "express";

import customNotificationController from "../controllers/customNotification.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, customNotificationController.createCustomNotification);

router.get("/", customNotificationController.getAllCustomNotifications);

router.delete("/:id", adminAuth, customNotificationController.deleteCustomNotification);

export default router;
