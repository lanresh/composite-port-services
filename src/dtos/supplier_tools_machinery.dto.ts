import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSupplierToolsMachineryDto {
  @IsString()
  @IsNotEmpty()
  public supplier_code: string;

  @IsString()
  @IsNotEmpty()
  public supplier_name: string;

  @IsString()
  @IsNotEmpty()
  public tool_type: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public others: string;

  @IsString()
  @IsNotEmpty()
  public procurement_type: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;
}
