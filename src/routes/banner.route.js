import express from "express";

import bannerController from "../controllers/banner.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router =
  express.Router();

router.post(
  "/",
  adminAuth,
  bannerController.createBanner
);

router.get(
  "/",
  
  bannerController.getAllBanners
);

router.get(
  "/:id",
  
  bannerController.getBannerById
);

router.put(
  "/:id",
  adminAuth,
  bannerController.updateBanner
);

router.delete(
  "/:id",
  adminAuth,
  bannerController.deleteBanner
);

export default router;