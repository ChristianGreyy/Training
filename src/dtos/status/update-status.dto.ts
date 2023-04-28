import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export default class CreateStatusDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsInt()
  order!: number;
}
