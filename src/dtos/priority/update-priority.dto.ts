import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export default class CreatePriorityDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsOptional()
  @IsInt()
  order!: number;
}
