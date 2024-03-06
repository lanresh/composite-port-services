import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStartupCostDto {
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsString()
  @IsNotEmpty()
  public startup_desc: string;

  @IsString()
  @IsNotEmpty()
  public startup_type: string;

  @IsNumber()
  @IsNotEmpty()
  public startup_cost: number;

  @IsString()
  @IsNotEmpty()
  public comment: string;
}
