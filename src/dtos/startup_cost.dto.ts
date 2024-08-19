import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStartupCostDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public startup_desc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public startup_type: string;

  @IsNumber()
  @IsNotEmpty()
  public startup_cost: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
