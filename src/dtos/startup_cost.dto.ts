import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStartupCostDto {
  @IsOptional()
  @IsString()
  public project_code: string;

  @IsOptional()
  @IsString()
  public startup_desc: string;

  @IsOptional()
  @IsString()
  public startup_type: string;

  @IsNumber()
  public startup_cost: number;

  @IsOptional()
  @IsString()
  public comment: string;
}
