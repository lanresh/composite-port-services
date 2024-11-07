import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCashAdvanceBreakdownDto {
  @IsOptional()
  @IsString()
  public request_code: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsNumber()
  public amount: number;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public comment: string;
}
