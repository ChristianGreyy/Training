import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export default class CreateTypeDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  color!: string;
}
