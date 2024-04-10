import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public full_name: string;

  @IsString()
  @IsNotEmpty()
  public phone_number: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsString()
  @IsNotEmpty()
  public project_details: string;

  @IsString()
  @IsNotEmpty()
  public flat_description: string;

  @IsString()
  @IsNotEmpty()
  public flat_code: string;

  @IsString()
  @IsNotEmpty()
  public annual_rent: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsString()
  @IsNotEmpty()
  public status: string;

  @IsString()
  @IsNotEmpty()
  public rent_payment: string;

  @IsString()
  @IsNotEmpty()
  public reminder: string;

  @IsString()
  @IsNotEmpty()
  public fees: string;
}
