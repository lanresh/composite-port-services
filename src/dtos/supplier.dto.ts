import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateSupplierDto {
    @IsOptional()
    @IsString()
    public supplier_name: string;

    @IsOptional()
    @IsString()
    public supplier_address: string;

    @IsOptional()
    @IsString()
    public supplier_ofc_phone: string;

    @IsOptional()
    @IsString()
    public contact_person: string;

    @IsOptional()
    @IsString()
    public comment: string;

    @IsOptional()
    @IsString()
    public contact_mobile: string;

    @IsOptional()
    @IsString()
    public contact_home_phone: string;

    @IsOptional()
    @IsEmail()
    public email: string;

    @IsOptional()
    @IsString()
    public website: string;
}