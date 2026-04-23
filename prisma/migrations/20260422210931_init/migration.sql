-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "User" (
    "tgId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("tgId")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "tgId" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "weekType" INTEGER NOT NULL,
    "dayOfWeek" "Day" NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "lesson_number" INTEGER NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "lesson_type" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "classroom" TEXT NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_tgId_fkey" FOREIGN KEY ("tgId") REFERENCES "User"("tgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
