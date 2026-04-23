export const WeekType = {
  FIRST_NUMERATOR: 0,
  FIRST_DENOMINATOR: 1,
  SECOND_NUMERATOR: 2,
  SECOND_DENOMINATOR: 3,
};

export const WeekTypeLabel = {
  0: "1ч",
  1: "1з",
  2: "2ч",
  3: "2з",
};

export const Day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export interface LessonDTO {
  lesson_number: number
  lesson_name: string
  lesson_type: string
  teacher: string
  classroom: string
};

export interface ScheduleDTO {
  semester: string
  week: number
  weekType: number
  dayOfWeek: string
  lessons: LessonDTO[]
};
