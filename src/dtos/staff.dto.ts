import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  public middlename: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsString()
  @IsNotEmpty()
  public dob: string;

  @IsString()
  @IsNotEmpty()
  public stateOfOrigin: string;

  @IsString()
  @IsNotEmpty()
  public lga: string;

  @IsString()
  @IsNotEmpty()
  public sex: string;

  @IsString()
  @IsNotEmpty()
  public marital_status: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public home_phone: string;

  @IsString()
  @IsNotEmpty()
  public cell_phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public nextOfKin: string;

  @IsString()
  @IsNotEmpty()
  public relationship: string;

  @IsString()
  @IsNotEmpty()
  public addressOfNOK: string;

  @IsEmail()
  public emailOfNOK: string;

  @IsString()
  @IsNotEmpty()
  public phoneOfNOK: string;

  @IsString()
  @IsNotEmpty()
  public date_employed: string;

  @IsString()
  @IsNotEmpty()
  public deptid: string;

  @IsString()
  @IsNotEmpty()
  public gradeid: string;

  @IsString()
  @IsNotEmpty()
  public branchcode: string;

  @IsString()
  @IsNotEmpty()
  public employee_status: string;

  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsString()
  @IsNotEmpty()
  public staff_type: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public user_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public secondary_email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public employment_type: string;
}
