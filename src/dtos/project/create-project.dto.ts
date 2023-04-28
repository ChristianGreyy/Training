import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
export default class CreateProjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  slug!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  start_date!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  end_date!: string;
}
