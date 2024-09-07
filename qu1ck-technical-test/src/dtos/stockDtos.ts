/**
 * Dto for stock
 */

import "reflect-metadata";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
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

export class EditStockDto extends CreateStockDto {
  @IsOptional()
  ingredient_name: string;
  @IsOptional()
  quantity: number;
  @IsOptional()
  unit_of_measurement: string;
}

export class EditStockItens {
  data: CreateStockDto[];
}
