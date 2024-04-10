import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsString()
  @IsNotEmpty()
  public supplier_code: string;

  @IsString()
  @IsNotEmpty()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public company: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contact_person: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contact_mobile: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public ofc_phone: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @IsNumber()
  @IsNotEmpty()
  public unit_price: number;

  @IsString()
  @IsNotEmpty()
  public payment_mode: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
