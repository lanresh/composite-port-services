import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsOptional()
  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  project_description: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  lga: string;

  @IsOptional()
  @IsString()
  start_date: string;

  @IsOptional()
  @IsString()
  end_date: string;


  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  project_supervisor: string;

  @IsOptional()
  @IsString()
  supervisor_id: string;
}
