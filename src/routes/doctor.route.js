import express from "express";

import doctorController from "../controllers/doctor.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, doctorController.createDoctor);

router.get("/", adminAuth, doctorController.getAllDoctors);

router.get("/:id", adminAuth, doctorController.getDoctorById);

router.put("/:id", adminAuth, doctorController.updateDoctor);

router.delete("/:id", adminAuth, doctorController.deleteDoctor);

export default router;
