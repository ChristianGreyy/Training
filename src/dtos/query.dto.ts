import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export default class QueryDto {
  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsString()
  populate?: string;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  deleteFlag?: string;
}
