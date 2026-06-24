import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import appointmentController from "../controllers/appointment.controller.js";

import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

router.post("/", authMiddleware, appointmentController.createAppointment);

router.get("/", appointmentController.getAllAppointments);

router.post("/revisit", appointmentController.createRevisitAppointment);

router.get("/revisit", appointmentController.getAllRevisitAppointments);

router.get("/my", authMiddleware, appointmentController.getMyAppointments);

router.put(
  "/my/:id",
  authMiddleware,
  appointmentController.updateMyAppointment
);

router.delete(
    "/my/:id",
    authMiddleware,
    appointmentController.cancelMyAppointment,
);

router.get(
    "/my/:id",
    authMiddleware,
    appointmentController.getMyAppointmentById,
);
router.get("/today", authMiddleware,appointmentController.getTodayAppointments);

router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

export default router;
