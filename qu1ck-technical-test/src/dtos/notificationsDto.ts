import { IsNotEmpty, IsString } from "class-validator";

export class CreateManagerNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
