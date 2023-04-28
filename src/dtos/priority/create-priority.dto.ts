import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export default class CreatePriorityDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsInt()
  order!: number;
}
