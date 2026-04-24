import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const ORIOKS_AUTH_URL = 'https://orioks.miet/api/v1/auth';
export const ORIOKS_WEEK_TYPE = 'https://orioks.miet/api/v1/schedule';
export const ORIOKS_GROUP_URL = 'https://orioks.miet/api/v1/schedule/group';
export const ORIOKS_LESSONS_TYPE = 'https://orioks.miet/api/v1/schedule/timetable';

