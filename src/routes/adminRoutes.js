import express from "express";

import adminAuth from "../middlewares/adminAuth.js";

import upload from "../middlewares/upload.middleware.js";

import {
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
  updateProfilePhoto,
  deleteProfilePhoto,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

// Login
router.post("/login", adminLogin);

// Profile
router.get(
  "/profile",
  adminAuth,
  getProfile
);

router.put(
  "/profile",
  adminAuth,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  adminAuth,
  changePassword
);

// Upload Profile Photo
router.put(
  "/profile-photo",
  adminAuth,
  upload.single("image"),
  updateProfilePhoto
);

// Delete Profile Photo
router.delete(
  "/profile-photo",
  adminAuth,
  deleteProfilePhoto
);

// Users
router.get(
  "/users",
  adminAuth,
  getAllUsers
);

router.delete(
  "/users/:id",
  adminAuth,
  deleteUser
);

export default router;