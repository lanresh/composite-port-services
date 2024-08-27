import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCashAdvanceBreakdownDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public request_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public comment: string;
}
