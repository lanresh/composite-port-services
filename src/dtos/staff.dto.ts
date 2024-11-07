import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @IsOptional()
  @IsString()
  public firstname: string;

  @IsOptional()
  @IsString()
  public middlename: string;

  @IsOptional()
  @IsString()
  public lastname: string;

  @IsOptional()
  @IsString()
  public dob: string;

  @IsOptional()
  @IsString()
  public stateOfOrigin: string;

  @IsOptional()
  @IsString()
  public lga: string;

  @IsOptional()
  @IsString()
  public sex: string;

  @IsOptional()
  @IsString()
  public marital_status: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public home_phone: string;

  @IsOptional()
  @IsString()
  public cell_phone: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public nextOfKin: string;

  @IsOptional()
  @IsString()
  public relationship: string;

  @IsOptional()
  @IsString()
  public addressOfNOK: string;

  @IsEmail()
  public emailOfNOK: string;

  @IsOptional()
  @IsString()
  public phoneOfNOK: string;

  @IsOptional()
  @IsString()
  public date_employed: string;

  @IsOptional()
  @IsString()
  public deptid: string;

  @IsOptional()
  @IsString()
  public gradeid: string;

  @IsOptional()
  @IsString()
  public branchcode: string;

  @IsOptional()
  @IsString()
  public employee_status: string;

  @IsOptional()
  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  public staff_type: string;

  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsOptional()
  @IsString()
  public user_type: string;

  @IsOptional()
  @IsString()
  public secondary_email: string;

  @IsOptional()
  @IsString()
  public employment_type: string;

  @IsOptional()
  @IsString()
  public username?: string;
}
