import express from "express";

import serviceController from "../controllers/service.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router =
  express.Router();

// Create Service

router.post(
  "/",
  adminAuth,
  serviceController.createService
);

// Get All Services

router.get(
  "/",
  serviceController.getAllServices
);

// Get Service By Id

router.get(
  "/:id",
  serviceController.getServiceById
);

// Update Service

router.put(
  "/:id",
  adminAuth,
  serviceController.updateService
);

// Delete Service

router.delete(
  "/:id",
  adminAuth,
  serviceController.deleteService
);

export default router;