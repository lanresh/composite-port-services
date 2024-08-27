import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public phone_number: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  public mobile_number: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public activation_code: string;
}
