import { Router } from "express";
import { createUser } from "../controllers/auth.controller.js";
import { getSchedule, getScheduleDay } from '../controllers/schedule.controller.js'
const router = Router();

router.get("/auth", createUser);
router.post("/schedule/", getSchedule);
router.post("/schedule/:id", getScheduleDay);

export default router;