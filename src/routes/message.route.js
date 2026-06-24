import express from "express";

import messageController from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", messageController.createMessage);

router.get("/:chatId", messageController.getMessagesByChatId);

router.patch("/:chatId/read", messageController.markMessagesAsRead);

router.get(
  "/:chatId/unread-count",
  messageController.getUserUnreadCount
);

router.patch(
  "/:chatId/read-user",
  messageController.markMessagesAsReadByUser
);

export default router;