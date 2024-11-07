import { IsOptional, IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';
export class CreateCashAdvanceDto {
  @IsOptional()
  @IsString()
  public project_code: string;

  @IsOptional()
  @IsString()
  public project_name: string;

  @IsOptional()
  @IsString()
  public cash_advance_type: string;

  @IsOptional()
  @IsString()
  public request_code: string;

  @IsOptional()
  @IsString()
  public staff_id: string;

  @IsOptional()
  @IsString()
  public staff_name: string;

  @IsOptional()
  @IsNumber()
  public amount_collected: number;

  @IsOptional()
  @IsNumber()
  public amount_recorded: number;

  @IsOptional()
  @IsNumber()
  public balance: number;

  @IsOptional()
  @IsString()
  @IsIn(['Pending', 'Approved'])
  public status: string;

  @IsOptional()
  @IsString()
  public purpose: string;

  @IsOptional()
  @IsString()
  public bank_to: string;

  @IsOptional()
  @IsString()
  public payment_method: string;
}
