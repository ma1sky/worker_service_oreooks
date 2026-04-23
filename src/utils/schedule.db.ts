import { PrismaClient } from '@prisma/client';
import type { ScheduleDTO} from '../models/worker.model.js'
import {Day} from '../models/worker.model.js'
const prisma = new PrismaClient();

export const createSchedule = async(tgId:number, schedule: ScheduleDTO) => {
    return await prisma.schedule.create({
    data: {
      tgId:tgId,
      semester: schedule.semester,
      week: schedule.week,
      weekType: schedule.weekType,

      dayOfWeek: schedule.dayOfWeek as any,

      lessons: {
        create: schedule.lessons.map((lesson) => ({
          lesson_number: lesson.lesson_number,
          lesson_name: lesson.lesson_name,
          lesson_type: lesson.lesson_type,
          teacher: lesson.teacher,
          classroom: lesson.classroom,
        })),
      },
    },
    include: {
      lessons: true,
    },
  });
};
export const getScheduleByWeek = async(tgId:number, weekType: number) => {
    return await prisma.schedule.findMany({
        where: {
            tgId:tgId,
            weekType,
        },
        include: {
            lessons: true,
        },
        orderBy: {
            week: 'asc',
        },
    });
};
export const getScheduleToday = async(tgId:number, weekType: number, dayOfWeek: string) => {
  if Day.
  return await prisma.schedule.findMany({
    where: {
      tgId:tgId,
      weekType:weekType,
      dayOfWeek: dayOfWeek
    }
  })
};
