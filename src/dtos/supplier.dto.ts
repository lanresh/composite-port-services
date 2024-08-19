import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateSupplierDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public supplier_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public supplier_address: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public supplier_ofc_phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public contact_person: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public comment: string;

    @IsOptional()
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