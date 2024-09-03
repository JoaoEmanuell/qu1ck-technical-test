import "reflect-metadata";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { StocksUnits } from "@prisma/client";

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  ingredient_name!: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity!: number;
  @IsEnum(StocksUnits)
  @IsNotEmpty()
  @IsString()
  unit_of_measurement!: string;
}
