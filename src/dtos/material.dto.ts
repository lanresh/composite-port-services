import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsOptional()
  @IsString()
  public project_code: string;

  @IsOptional()
  @IsString()
  public supplier_code: string;

  @IsOptional()
  @IsString()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  public company: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public contact_person: string;

  @IsOptional()
  @IsString()
  public contact_mobile: string;

  @IsOptional()
  @IsString()
  public ofc_phone: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsNumber()
  public quantity: number;

  @IsOptional()
  @IsNumber()
  public unit_price: number;

  @IsOptional()
  @IsString()
  public payment_mode: string;

  @IsOptional()
  @IsString()
  public comment: string;
}
