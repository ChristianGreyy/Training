import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
export default class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;
}
