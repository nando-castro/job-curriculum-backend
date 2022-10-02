/*
  Warnings:

  - Made the column `typeDriverLicense` on table `personalsDatas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "personalsDatas" ALTER COLUMN "typeDriverLicense" SET NOT NULL;
