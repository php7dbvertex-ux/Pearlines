import express from "express";

import notificationController from "../controllers/notification.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, notificationController.createNotification);

router.get("/", notificationController.getAllNotifications);

router.get("/:id", adminAuth, notificationController.getNotificationById);

router.delete("/:id", adminAuth, notificationController.deleteNotification);

export default router;
