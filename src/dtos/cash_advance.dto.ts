import { IsOptional, IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';
export class CreateCashAdvanceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public cash_advance_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public request_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public staff_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public staff_name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public amount_collected: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public amount_recorded: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public balance: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(['Pending', 'Approved'])
  public status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public purpose: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public bank_to: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public payment_method: string;
}
