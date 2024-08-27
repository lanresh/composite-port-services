import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsOptional()
  @IsString()
  public middlename: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public dob: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public stateOfOrigin: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public lga: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public sex: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public marital_status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public home_phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public cell_phone: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nextOfKin: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public relationship: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public addressOfNOK: string;

  @IsEmail()
  public emailOfNOK: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public phoneOfNOK: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public date_employed: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public deptid: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public gradeid: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public branchcode: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public employee_status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public staff_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public user_type: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public secondary_email: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public employment_type: string;

  @IsOptional()
  @IsString()
  public username?: string;
}
