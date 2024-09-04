import "reflect-metadata";
import { RequestStatus } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  request_itens: string;
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @IsOptional()
  @IsString()
  @IsEnum(RequestStatus)
  status: string;
}

export class EditRequestDto extends CreateRequestDto {
  @IsOptional()
  request_itens: string;
  @IsOptional()
  date: Date;
}
