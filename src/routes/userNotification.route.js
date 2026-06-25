import express from "express";

import userNotificationController from "../controllers/userNotification.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  userNotificationController.getUserNotifications
);
router.get(
  "/unread-count",
  authMiddleware,
  userNotificationController.getUnreadCount
);

router.patch(
  "/read",
  authMiddleware,
  userNotificationController.markNotificationRead
);

router.get(
  "/",
  authMiddleware,
  userNotificationController.getUserNotifications
);

router.get(
  "/unread-count",
  authMiddleware,
  userNotificationController.getUnreadCount
);



export default router;