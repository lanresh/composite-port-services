import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSupplierMaterialDto {
  @IsOptional()
  @IsString()
  public supplier_code: string;

  @IsOptional()
  @IsString()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  public mat_desc: string;

  @IsOptional()
  @IsString()
  public project_code: string;

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public unit_price: number;
}
