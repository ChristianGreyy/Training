import {
  IsDate,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

enum gender {
  male = "male",
  female = "female",
}

enum StatusEnum {
  active = "active",
  inactive = "inactive",
}

export default class CreateUserDto {
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

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  first_name!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  last_name!: string;

  @IsDate()
  birthday!: string;

  @IsString()
  @MaxLength(4)
  gender!: string;

  @IsEnum(status, { message: "Invalid user role" })
  inactive: boolean;
}
