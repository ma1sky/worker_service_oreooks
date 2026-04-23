import axios from 'axios';
import {ORIOKS_GROUP_URL, ORIOKS_LESSONS_TYPE, ORIOKS_WEEK_TYPE} from '../config/worker.config.js'
import { createTokenHeader } from '../utils/worker.js'
import type { ScheduleDTO, LessonDTO } from '../models/worker.model.js'

export const getSemesterStart = async (token:string) => {
    const tokenHeader = createTokenHeader(token);
    try { 
        const response = await axios.get(ORIOKS_WEEK_TYPE, {
        headers: {
            'Accept': 'application/json',
            'Authorization': tokenHeader,
            'User-Agent': 'bot_oreooks/0.1'
        }});

        return response.data.semester_start;
    } catch(e: any) {
        if (e.response.status=== 400) {
            throw new Error('Отсутствует или недопустимый заголовк или ключ');
        }
        if (e.response.status=== 401) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 404) {
            throw new Error('Отсутствует ресурс по данному URI');
        }
        if (e.response.status=== 405) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 410) {
            throw new Error('Данная версия API устарела');
        }
        throw e;
    }
};
export const getWeek = async (token:string) => {
    const semesterStart = await getSemesterStart(token);
    const now = new Date();
    const date = new Date(semesterStart);
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};
export const getWeekType = async (token:string) => {
    const week = await getWeek(token);
    return (week - 1) % 4;
};
export const getLessonTime = async (token:string) => {
    const tokenHeader = createTokenHeader(token);
    try { 
        const response = await axios.get(ORIOKS_LESSONS_TYPE, {
        headers: {
            'Accept': 'application/json',
            'Authorization': tokenHeader,
            'User-Agent': 'bot_oreooks/0.1'
        }});
    return response.data;
    } catch(e: any) {
        if (e.response.status=== 400) {
            throw new Error('Отсутствует или недопустимый заголовк или ключ');
        }
        if (e.response.status=== 401) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 404) {
            throw new Error('Отсутствует ресурс по данному URI');
        }
        if (e.response.status=== 405) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 410) {
            throw new Error('Данная версия API устарела');
        }
        throw e;
    }
};
export const getIdGroup = async (token:string) => {
    const tokenHeader = createTokenHeader(token);
    try { 
        const response = await axios.get(ORIOKS_GROUP_URL, {
        headers: {
            'Accept': 'application/json',
            'Authorization': tokenHeader,
            'User-Agent': 'bot_oreooks/0.1'
        }});
    return response.data.id;
    } catch(e: any) {
        if (e.response.status=== 400) {
            throw new Error('Отсутствует или недопустимый заголовк или ключ');
        }
        if (e.response.status=== 401) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 404) {
            throw new Error('Отсутствует ресурс по данному URI');
        }
        if (e.response.status=== 405) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 410) {
            throw new Error('Данная версия API устарела');
        }
        throw e;
    }
};
export const getSchedule = async (token: string): Promise<ScheduleDTO> => {
    const tokenHeader = createTokenHeader(token);
    const idGroup = await getIdGroup(token);
    try { 
        const response = await axios.get(`${ORIOKS_GROUP_URL}/${idGroup}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': tokenHeader,
            'User-Agent': 'bot_oreooks/0.1'
        }});
        const data = response.data;

        const weekKey = Object.keys(data)
        .find(key => !isNaN(Number(key)));
        if (!weekKey) {
        throw new Error("Week not found");
        }
        const weekData = data[weekKey];

        const dayKey = Object.keys(weekData)[0];
        
        if (!dayKey) {
            throw new Error("Day not found");
        }

        const dayData = weekData[dayKey];

        const lessons: LessonDTO[] = Object.keys(dayData)
        .map((lessonNumber) => {

            const lesson = dayData[lessonNumber];

            return {
            lesson_number: Number(lessonNumber),
            lesson_name: lesson.name,
            lesson_type: lesson.type,
            teacher: lesson.teacher,
            classroom: lesson.classroom
            };

        });

        const schedule: ScheduleDTO = {
            semester: data.semester,
            week: Number(weekKey),
            weekType: Number(weekKey),
            dayOfWeek: dayKey,
            lessons: lessons
        };

        return schedule;

    } catch(e: any) {
        if (e.response.status=== 400) {
            throw new Error('Отсутствует или недопустимый заголовк или ключ');
        }
        if (e.response.status=== 401) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 404) {
            throw new Error('Отсутствует ресурс по данному URI');
        }
        if (e.response.status=== 405) {
            throw new Error('Несуществующий или аннулированный токен');
        }
        if (e.response.status=== 410) {
            throw new Error('Данная версия API устарела');
        }
        throw e;
    }
};
