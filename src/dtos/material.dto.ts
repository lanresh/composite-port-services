import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public supplier_code: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public unit_price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public payment_mode: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
