import { IsNotEmpty, IsString } from "class-validator";
import "reflect-metadata";

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  text!: string;
}
