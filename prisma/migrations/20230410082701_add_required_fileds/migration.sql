/*
  Warnings:

  - Made the column `name` on table `Museum` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `School` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `SigleVisit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Museum" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "SigleVisit" ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "phoneNumber" SET NOT NULL;
