import express from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", userController.createUser);
router.get("/", authMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/:id", authMiddleware, userController.getUserById);

export default router;