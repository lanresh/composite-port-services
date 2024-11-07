import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateRequestDto {
  @IsOptional()
  @IsString()
  public carttemp_sess: string;

  @IsOptional()
  @IsString()
  public staff_id: string;

  @IsOptional()
  @IsString()
  public staff_name: string;

  @IsOptional()
  @IsEmail()
  public staff_email: string;

  @IsOptional()
  @IsString()
  public request_type: string;

  @IsOptional()
  @IsString()
  public project_name: string;

  @IsOptional()
  @IsString()
  public project_code: string;

  @IsOptional()
  @IsString()
  public supplier_code: string;

  @IsOptional()
  @IsString()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  public supplier_material: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsNumber()
  public quantity: number;

  @IsOptional()
  @IsNumber()
  public unit_price: number;

  @IsOptional()
  @IsString()
  public worker_name: string;

  @IsOptional()
  @IsString()
  public worker_code: string;

  @IsOptional()
  @IsString()
  public worker_service: string;

  @IsOptional()
  @IsNumber()
  public amount: number;

  @IsOptional()
  @IsString()
  public job_code: string;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  @IsString()
  public response: string;

  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED', 'RECOMMENDED'])
  public status: string;

  @IsOptional()
  @IsString()
  public date: Date;

  @IsOptional()
  @IsString()
  public company: string;

  @IsOptional()
  @IsString()
  public company_address: string;

  @IsOptional()
  @IsString()
  public contact_person: string;

  @IsOptional()
  @IsString()
  public contact_mobile: string;

  @IsOptional()
  @IsString()
  public ofc_phone: string;

  @IsOptional()
  @IsString()
  public cash_advance_purpose: string;

  @IsOptional()
  @IsString()
  public tool_name: string;

  @IsOptional()
  @IsString()
  public approved_by: string;

  @IsOptional()
  @IsString()
  public approved_on: Date;

  @IsOptional()
  @IsNumber()
  public approved_amount: number;

  @IsOptional()
  @IsNumber()
  public approved_quantity: number;

  @IsOptional()
  @IsNumber()
  public approved_unit_price: number;

  @IsOptional()
  @IsNumber()
  public approved_total_amount: number;

  @IsOptional()
  @IsString()
  public tool_machinery_type: string;

  @IsOptional()
  @IsNumber()
  public inventory_type_id: number;

  @IsOptional()
  @IsString()
  public supervisor_comment: string;
}
