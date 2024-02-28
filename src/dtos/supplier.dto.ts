import { IsString, IsNotEmpty } from 'class-validator';

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

    @IsString()
    @IsNotEmpty()
    public comment: string;

    @IsString()
    @IsNotEmpty()
    public contact_mobile: string;

    @IsString()
    @IsNotEmpty()
    public contact_home_phone: string;

}