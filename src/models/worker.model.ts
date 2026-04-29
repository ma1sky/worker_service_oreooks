import { Day } from "@prisma/client";

export enum WeekType {
  FIRST_NUMERATOR,
  FIRST_DENOMINATOR,
  SECOND_NUMERATOR,
  SECOND_DENOMINATOR,
};

export const WeekTypeLabel = {
  0: "1ч",
  1: "1з",
  2: "2ч",
  3: "2з",
};

export interface ScheduleDTO {
  semester: string;
  week: number;
  weekType: number;
  dayOfWeek: Day;
  lessons: LessonDTO[];
}

export interface LessonDTO {
  lesson_number: number
  lesson_name: string
  lesson_type: string
  teacher: string
  classroom: string
};
