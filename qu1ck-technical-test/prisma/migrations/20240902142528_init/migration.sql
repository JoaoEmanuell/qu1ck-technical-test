-- CreateEnum
CREATE TYPE "StocksUnits" AS ENUM ('gram', 'mililiter', 'unit');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('received', 'in_progress', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE "Stocks" (
    "id" SERIAL NOT NULL,
    "ingredient_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_of_measurment" "StocksUnits" NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "request_itens" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "RequestStatus" NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);
