import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export default class CreateStatusDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsInt()
  order!: number;
}
