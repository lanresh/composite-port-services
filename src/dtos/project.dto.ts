import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  project_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  project_description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lga: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  end_date: string;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  project_supervisor: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  supervisor_id: string;
}
