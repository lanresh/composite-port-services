import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConsultantDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsString()
  public contact: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public website: string;
}
