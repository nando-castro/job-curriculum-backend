/*
  Warnings:

  - Added the required column `office` to the `personalsDatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personalsDatas" ADD COLUMN     "office" VARCHAR(255) NOT NULL;
