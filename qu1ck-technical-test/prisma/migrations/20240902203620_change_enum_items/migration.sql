/*
  Warnings:

  - The values [mililiter] on the enum `StocksUnits` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StocksUnits_new" AS ENUM ('gram', 'milliliter', 'unit');
ALTER TABLE "Stocks" ALTER COLUMN "unit_of_measurement" TYPE "StocksUnits_new" USING ("unit_of_measurement"::text::"StocksUnits_new");
ALTER TYPE "StocksUnits" RENAME TO "StocksUnits_old";
ALTER TYPE "StocksUnits_new" RENAME TO "StocksUnits";
DROP TYPE "StocksUnits_old";
COMMIT;
