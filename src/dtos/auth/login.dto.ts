import {
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export default class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  user_name!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  pass_word!: string;
}
