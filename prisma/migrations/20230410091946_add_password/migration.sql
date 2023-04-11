/*
  Warnings:

  - Added the required column `password` to the `Museum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Museum" ADD COLUMN     "password" TEXT NOT NULL;
