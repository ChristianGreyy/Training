import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export default class CreateRoleDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;
}
