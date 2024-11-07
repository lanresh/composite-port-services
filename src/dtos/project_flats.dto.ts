import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectFlatsDto {
  @IsOptional()
  @IsString()
  public project_name: string;

  @IsOptional()
  @IsString()
  public project_code: string;

  @IsOptional()
  @IsString()
  public flat_desc: string;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  @IsString()
  public status: string;
}
