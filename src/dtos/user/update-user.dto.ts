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

export default class UpdateUserDto {
  @IsOptional()
  @IsInt()
  role_id!: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  pass_word!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name!: string;

  @IsOptional()
  @IsString()
  birthday!: string;

  @IsOptional()
  @IsEnum(Gender, { message: "Invalid gender of user" })
  gender!: string;

  @IsOptional()
  @IsEnum(Status, { message: "Invalid status of user" })
  status!: boolean;
}
