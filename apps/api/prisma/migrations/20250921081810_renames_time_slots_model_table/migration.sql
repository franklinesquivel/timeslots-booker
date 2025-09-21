/*
  Warnings:

  - You are about to drop the `time_slots` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."time_slots" DROP CONSTRAINT "time_slots_userId_fkey";

-- DropTable
DROP TABLE "public"."time_slots";

-- DropEnum
DROP TYPE "public"."TimeSlotStatus";

-- CreateTable
CREATE TABLE "public"."time_slot_bookings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" UUID NOT NULL,

    CONSTRAINT "time_slot_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "time_slot_bookings_userId_key" ON "public"."time_slot_bookings"("userId");

-- AddForeignKey
ALTER TABLE "public"."time_slot_bookings" ADD CONSTRAINT "time_slot_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
