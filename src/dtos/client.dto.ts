import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone_number: string;

  @IsString()
  @IsNotEmpty()
  public mobile_number: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsString()
  public activation_code: string;

}

