import dotenv from 'dotenv';
dotenv.config();

export const PORT: string = process.env.PORT as string;
export const DATABASE_URL: string = process.env.DATABASE_URL as string;
export const ORIOKS_AUTH_URL = 'https://orioks.miet/api/v1/auth';
export const ORIOKS_WEEK_TYPE = 'https://orioks.miet/api/v1/schedule';
export const ORIOKS_GROUP_URL = 'https://orioks.miet/api/v1/schedule/group';
export const ORIOKS_LESSONS_TYPE = 'https://orioks.miet/api/v1/schedule/timetable';

