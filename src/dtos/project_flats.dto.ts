import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectFlatsDto {
  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsString()
  @IsNotEmpty()
  public flat_desc: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public status: string;
}
