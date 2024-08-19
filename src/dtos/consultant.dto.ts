import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConsultantDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contact: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public website: string;
}
