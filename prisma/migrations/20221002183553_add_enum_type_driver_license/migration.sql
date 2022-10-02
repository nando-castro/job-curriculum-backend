/*
  Warnings:

  - You are about to drop the column `driverLicense` on the `personalsDatas` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DriverLicenseType" AS ENUM ('A', 'B', 'AB', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "personalsDatas" DROP COLUMN "driverLicense",
ADD COLUMN     "typeDriverLicense" "DriverLicenseType",
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE TEXT,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "linkedin" SET DATA TYPE TEXT;
