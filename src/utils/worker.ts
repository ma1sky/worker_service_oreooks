import { Day } from "@prisma/client";
 
const days: Day[] = [
 Day.Monday,
 Day.Tuesday,
 Day.Wednesday,
 Day.Thursday,
 Day.Friday,
 Day.Saturday,
 Day.Sunday
];

export function createAuthHeader(login:string,password:string): string {
  const base64 = Buffer
    .from(`${login}:${password}`)
    .toString('base64');

  return `Basic ${base64}`;
};

export function createTokenHeader(token:string): string {
    return `Bearer ${token}`;
};

const getDayByOffset = (offset = 0): Day => {
  let jsDay = new Date().getDay();
  jsDay = jsDay === 0 ? 6 : jsDay - 1;
  return days[(jsDay + offset) % 7]!;

};

export const getTodayDay = () =>
  getDayByOffset();

export const getTomorrowDay = () =>
  getDayByOffset(1);

export const getTodayYesterday = () =>
  getDayByOffset(-1);