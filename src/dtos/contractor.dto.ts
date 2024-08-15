import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContractorDto {
  @IsString()
  @IsNotEmpty()
  public contractor_name: string;

  @IsString()
  @IsNotEmpty()
  public contractor_service: string;

  @IsString()
  @IsNotEmpty()
  public contractor_address: string;

  @IsString()
  @IsNotEmpty()
  public contractor_ofc_phone: string;

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
  public contact_home_phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public website: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
