import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectFlatsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public flat_desc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public status: string;
}
