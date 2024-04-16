import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class createContractorProjectDto {
  @IsString()
  @IsNotEmpty()
  public contractor_code: string;

  @IsString()
  @IsNotEmpty()
  public contractor_project_code: string;

  @IsNumber()
  @IsNotEmpty()
  public contractor_amount: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public service: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public status: string;
}
