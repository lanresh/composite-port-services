export enum STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    RECOMMENDED = 'RECOMMENDED'
}

export interface Request {
    id: number;
    request_code: string;
    carttemp_sess: string;
    staff_id: string;
    staff_name: string;
    staff_email: string;
    request_type: string;
    project_name: string;
    project_code: string;
    supplier_code: string;
    supplier_name: string;
    supplier_material: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    worker_name: string;
    worker_code: string;
    worker_service: string;
    amount: number;
    job_code: string;
    comment: string;
    response: string;
    status: STATUS;
    date: Date;
    company: string;
    company_address: string;
    contact_person: string;
    contact_mobile: string;
    ofc_phone: string;
    cash_advance_purpose: string;
    tool_name: string;
    approved_by: string;
    approved_on: Date;
    approved_amount: number;
    approved_quantity: number;
    approved_unit_price: number;
    approved_total_amount: number;
    tool_machinery_type: string;
    inventory_type_id: number;
    supervisor_comment: string;
    payment_method: string;
    bank:string;
    account_number:string;
    account_name:string;  
}

