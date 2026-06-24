import express from "express";

import doctorScheduleController from "../controllers/doctorSchedule.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, doctorScheduleController.createSchedule);

router.get("/", adminAuth, doctorScheduleController.getAllSchedules);

router.get("/:id", adminAuth, doctorScheduleController.getScheduleById);

router.put("/:id", adminAuth, doctorScheduleController.updateSchedule);

router.delete("/:id", adminAuth, doctorScheduleController.deleteSchedule);

export default router;
