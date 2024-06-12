/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "date_of_birth",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL DEFAULT NOW();
