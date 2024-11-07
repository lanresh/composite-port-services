import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class createContractorProjectDto {
  @IsString()
  public contractor_code: string;

  @IsString()
  public contractor_project_code: string;

  @IsNumber()
  public contractor_amount: number;

  @IsOptional()
  @IsNumber()
  public approved_amount: number;

  @IsOptional()
  @IsString()
  public service: string;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  @IsString()
  public status: string;
}
