import "reflect-metadata";
import { RequestStatus } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRequestDto {
  @IsNotEmpty()
  @IsObject()
  request_itens: object;
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
  request_itens: object;
  @IsOptional()
  date: Date;
}
