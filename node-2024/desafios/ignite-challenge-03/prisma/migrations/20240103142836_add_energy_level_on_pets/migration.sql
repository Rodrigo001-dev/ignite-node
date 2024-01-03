/*
  Warnings:

  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "energy_level" TEXT NOT NULL;
