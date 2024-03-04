export interface Tenant {
    tenant_id: number;
    tenant_code: string;
    title: string;
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    project_name: string;
    project_details: string;
    flat_description: string;
    flat_code: string;
    annual_rent: number;
    comment: string;
    status: string;
    rent_payment: string;
    reminder: string;
    fee_type : string[];
    value: number[];
}
