import { IsString, IsNotEmpty } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  public contact_mobile: string;

  @IsString()
  @IsNotEmpty()
  public contact_home_phone: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public website: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;
}
