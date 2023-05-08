import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

enum Gender {
  male = "male",
  female = "female",
}

enum Status {
  active = "active",
  inactive = "inactive",
}

export default class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  code!: string | null;

  @IsOptional()
  @IsInt()
  role_id!: number;

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
  @MinLength(2)
  @MaxLength(20)
  first_name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name!: string;

  @IsString()
  birthday!: string;

  @IsEnum(Gender, { message: "Invalid gender of user" })
  gender!: string;

  // @IsEnum(Status, { message: "Invalid status of user" })
  // status!: boolean;
}
