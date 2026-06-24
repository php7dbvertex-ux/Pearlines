import express from "express";

import videoController from "../controllers/video.controller.js";

import adminAuth from "../middlewares/adminAuth.js";


const router =
  express.Router();

// Create Video

router.post(
  "/",
  adminAuth,
  videoController.createVideo
);

// Get All Videos

router.get(
  "/",
  videoController.getAllVideos
);

// Get Video By Id

router.get(
  "/:id",
  videoController.getVideoById
);

// Update Video

router.put(
  "/:id",
  adminAuth,
  videoController.updateVideo
);

// Delete Video

router.delete(
  "/:id",
  adminAuth,
  videoController.deleteVideo
);

export default router;