import express from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMyProfile);


router.put("/profile", authMiddleware, userController.updateProfile);

router.put(
  "/profile-photo",
  authMiddleware,
  upload.single("image"),
  userController.updateProfilePhoto,
);
router.delete(
  "/profile-photo",
  authMiddleware,
  userController.deleteProfilePhoto,
);
router.put("/change-password", authMiddleware, userController.changePassword);
router.post("/fcm-token", authMiddleware, userController.updateFcmToken);


router.post("/", userController.createUser);
router.get("/", authMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/:id", authMiddleware, userController.getUserById);

export default router;
