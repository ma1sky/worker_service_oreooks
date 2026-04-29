import { Router } from "express";
import { createUser } from "../controllers/auth.controller";
import { getSchedule, getScheduleDay } from '../controllers/schedule.controller'
const router = Router();

router.get("/auth", createUser);
router.get("/schedule/", getSchedule);
router.get("/schedule/today", getScheduleDay);
router.get("/schedule/tomorrow", (req,res) => {
    req.query.type="tomorrow";
    return getScheduleDay(req,res);
});

export default router;