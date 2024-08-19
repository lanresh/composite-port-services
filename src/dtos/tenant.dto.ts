import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export type fees = {
  type: string;
  value: number;
}

export class CreateTenantDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public full_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public phone_number: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_details: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public flat_description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public flat_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public annual_rent: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public rent_payment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public reminder: string;

  @IsNotEmpty()
  public fees: fees[];
}
