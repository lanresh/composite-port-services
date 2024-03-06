import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public carttemp_sess: string;

  @IsString()
  @IsNotEmpty()
  public staff_id: string;

  @IsString()
  @IsNotEmpty()
  public staff_name: string;

  @IsOptional()
  @IsEmail()
  public staff_email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public request_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public project_code: string;

  @IsOptional()
  @IsString()
  public supplier_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public supplier_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public supplier_material: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public unit_price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public worker_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public worker_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public worker_service: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public job_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public response: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED', 'RECOMMENDED'])
  public status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public date: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public company: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public company_address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contact_person: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contact_mobile: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public ofc_phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public cash_advance_purpose: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public tool_name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_by: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public approved_on: Date;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_amount: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_quantity: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_unit_price: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public approved_total_amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public tool_machinery_type: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  public inventory_type_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public supervisor_comment: string;
}
