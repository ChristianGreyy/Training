import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

enum Status {
  add = "add",
  delete = "delete",
  update = "update",
}

export default class SolveMemberProjectDto {
  @IsArray()
  members!: string[];

  @IsEnum(Status, { message: "Invalid status" })
  status!: string;
}
