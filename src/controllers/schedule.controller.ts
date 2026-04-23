import type { Request, Response } from 'express'
import { scheduleService } from '../services/orioks.schedule.service.js';
import { scheduleDb } from '../utils/schedule.db.js';
import { getUser } from '../utils/user.db.js'

export const getSchedule = async (req: Request, res: Response) => {
    const tgId = req.body.tgid;
    if (!getUser(tgId)) {
        return res.status().json({
        message: "User don't created"
        });
    } if(!scheduleDb.getSchedule(tgId)) {
        const user = getUser(tgId);
        const shedule = scheduleService.getSchedule(user.token);
        scheduleDb.createSchedule(tgId, shedule);
        return scheduleDb.getScheduleByWeek(tgId,)


    }
}
export const getScheduleDay = async (req: Request, res: Response) => {
    const tgId = req.body.tgId;
    if ()

}