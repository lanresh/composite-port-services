import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCashAdvanceBreakdownDto {
  @IsString()
  @IsNotEmpty()
  public request_code: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  public cooment: string;
}
