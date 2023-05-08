import {
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export default class VerifyCodeDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  code!: string;
}
