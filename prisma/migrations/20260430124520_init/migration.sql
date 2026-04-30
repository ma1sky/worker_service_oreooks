/*
  Warnings:

  - The values [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday] on the enum `Day` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tgId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scheduleId,lesson_number]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tg_id,week,dayOfWeek]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tg_id` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Day_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
ALTER TABLE "Schedule" ALTER COLUMN "dayOfWeek" TYPE "Day_new" USING ("dayOfWeek"::text::"Day_new");
ALTER TYPE "Day" RENAME TO "Day_old";
ALTER TYPE "Day_new" RENAME TO "Day";
DROP TYPE "public"."Day_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_tgId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "tgId",
ADD COLUMN     "tg_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "tg_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("tg_id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "course" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "record_book_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "study_direction" TEXT NOT NULL,
    "study_profile" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_scheduleId_lesson_number_key" ON "Lesson"("scheduleId", "lesson_number");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_tg_id_week_dayOfWeek_key" ON "Schedule"("tg_id", "week", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("tg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("tg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_tg_id_fkey" FOREIGN KEY ("tg_id") REFERENCES "users"("tg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
