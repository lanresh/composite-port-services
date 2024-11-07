import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  @IsString()
  public first_name: string;

  @IsOptional()
  @IsString()
  public last_name: string;

  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public mobile_number: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public state: string;

  @IsOptional()
  @IsString()
  public activation_code: string;
}
