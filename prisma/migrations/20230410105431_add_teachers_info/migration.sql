/*
  Warnings:

  - Added the required column `phone` to the `SigleVisit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SigleVisit" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;
