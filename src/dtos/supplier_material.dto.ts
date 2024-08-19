import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSupplierMaterialDto {
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
  public mat_desc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @IsNumber()
  @IsNotEmpty()
  public unit_price: number;
}
