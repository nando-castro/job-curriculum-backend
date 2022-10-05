/*
  Warnings:

  - You are about to drop the column `imageUser` on the `personalsDatas` table. All the data in the column will be lost.
  - Added the required column `picture` to the `personalsDatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personalsDatas" DROP COLUMN "imageUser",
ADD COLUMN     "picture" VARCHAR(255) NOT NULL;
