import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export type fees = {
  type: string;
  value: number;
}

export class CreateTenantDto {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public full_name: string;

  @IsOptional()
  @IsString()
  public phone_number: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public project_name: string;

  @IsOptional()
  @IsString()
  public project_details: string;

  @IsOptional()
  @IsString()
  public flat_description: string;

  @IsOptional()
  @IsString()
  public flat_code: string;

  @IsOptional()
  @IsString()
  public annual_rent: string;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public rent_payment: string;

  @IsOptional()
  @IsString()
  public reminder: string;

  public fees: fees[];
}
