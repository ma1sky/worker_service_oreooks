import { Day } from '../models/worker.model.js'

export function createAuthHeader(login:string,password:string): string {
  const base64 = Buffer
    .from(`${login}:${password}`)
    .toString('base64');

  return `Basic ${base64}`;
};

export function createTokenHeader(token:string): string {
    return `Bearer ${token}`;
};

const getDayByOffset = (offset: number): string  => {
  const index = new Date().getDay();
  return Day[(index + offset) % 7]!;
};

export const getTodayDay = (): string => getDayByOffset(0);

export const getTomorrowDay = (): string => getDayByOffset(1);