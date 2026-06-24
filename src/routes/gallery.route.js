import express from "express";
import galleryController from "../controllers/gallery.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router =
  express.Router();

router.post(
  "/",
  adminAuth,
  galleryController.createGallery
);

router.get(
  "/",
  galleryController.getAllGallery
);

router.get(
  "/:id",
  galleryController.getGalleryById
);

router.put(
  "/:id",
  adminAuth,
  galleryController.updateGallery
);

router.delete(
  "/:id",
  adminAuth,
  galleryController.deleteGallery
);

export default router;