import {
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

enum Role {
  leader = "leader",
  developer = "developer",
  tester = "tester",
  designer = "designer",
}

export default class CreateInviteDto {
  @IsInt()
  project_id!: string;

  @IsInt()
  user_id!: string;

  @IsEnum(Role, { message: "Invalid role of participant" })
  role!: string;
}
