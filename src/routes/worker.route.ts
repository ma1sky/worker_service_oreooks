import { Router } from "express";
import { getSchedule, getScheduleDay } from '../controllers/schedule.controller'
const router = Router();

router.get("/users/:tgId/schedule/", getSchedule);
router.get("/users/:tgId/schedule/today", getScheduleDay);
router.get("/users/:tgId/schedule/tomorrow", (req,res) => {
    req.query.type="tomorrow";
    return getScheduleDay(req,res);
});

export default router;