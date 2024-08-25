import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContractorDto {
  @IsOptional()
  @IsString()
  public contractor_name: string;

  @IsOptional()
  @IsString()
  public contractor_service: string;

  @IsOptional()
  @IsString()
  public contractor_address: string;

  @IsOptional()
  @IsString()
  public contractor_ofc_phone: string;

  @IsOptional()
  @IsString()
  public contact_person: string;

  @IsOptional()
  @IsString()
  public contact_mobile: string;

  @IsOptional()
  @IsString()
  public contact_home_phone: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public website: string;

  @IsOptional()
  @IsString()
  public comment: string;
}
