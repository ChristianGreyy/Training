import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export default class CreateTaskDto {
  @IsInt()
  creator_id!: number;

  @IsInt()
  assignee_id!: number;

  @IsInt()
  project_id!: number;

  @IsInt()
  type_id!: number;

  @IsInt()
  status_id!: number;

  @IsInt()
  priority_id!: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  start_date!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  end_date!: string;
}
