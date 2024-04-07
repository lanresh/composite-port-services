import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConsultantDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  public contact: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public website: string;
}
