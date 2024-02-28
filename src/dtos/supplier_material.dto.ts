import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSupplierMaterialDto {
  @IsString()
  @IsNotEmpty()
  public supplier_code: string;

  @IsString()
  @IsNotEmpty()
  public supplier_name: string;

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
