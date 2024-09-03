/*
  Warnings:

  - You are about to drop the column `unit_of_measurment` on the `Stocks` table. All the data in the column will be lost.
  - Added the required column `unit_of_measurement` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "unit_of_measurment",
ADD COLUMN     "unit_of_measurement" "StocksUnits" NOT NULL;
