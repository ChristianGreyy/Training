import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
export default class CreateTypeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  color!: string;
}
