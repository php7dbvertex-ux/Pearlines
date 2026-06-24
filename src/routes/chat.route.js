import express from "express";

import chatController from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", chatController.createChat);

router.get("/", chatController.getAllChats);



export default router;
