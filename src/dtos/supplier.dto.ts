import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    public supplier_name: string;

    @IsString()
    @IsNotEmpty()
    public supplier_address: string;

    @IsString()
    @IsNotEmpty()
    public supplier_ofc_phone: string;

    @IsString()
    @IsNotEmpty()
    public contact_person: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public comment: string;

    @IsString()
    @IsNotEmpty()
    public contact_mobile: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public contact_home_phone: string;

    @IsOptional()
    @IsEmail()
    public email: string;

    @IsOptional()
    @IsString()
    public website: string;
}