import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export default class CreateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  slug!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  start_date!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  end_date!: string;
}
