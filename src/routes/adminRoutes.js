import express from "express";

import adminAuth from "../middlewares/adminAuth.js";

import {
  adminLogin,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

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