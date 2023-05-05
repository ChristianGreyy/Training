import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export default class CreateTaskDto {
  @IsOptional()
  @IsInt()
  creator_id!: number;

  @IsOptional()
  @IsInt()
  assignee_id!: number;

  @IsOptional()
  @IsInt()
  project_id!: number;

  @IsOptional()
  @IsInt()
  type_id!: number;

  @IsOptional()
  @IsInt()
  status_id!: number;

  @IsOptional()
  @IsInt()
  priority_id!: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  start_date!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  end_date!: string;
}
