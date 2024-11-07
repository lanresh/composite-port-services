import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSupplierToolsMachineryDto {
  @IsOptional()
  @IsString()
  public supplier_code: string;

  @IsOptional()
  @IsString()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  public tool_type: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public others: string;

  @IsOptional()
  @IsString()
  public procurement_type: string;

  @IsOptional()
  @IsString()
  public comment: string;
}
