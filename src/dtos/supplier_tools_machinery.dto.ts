import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSupplierToolsMachineryDto {
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
  public tool_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public others: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public procurement_type: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public comment: string;
}
