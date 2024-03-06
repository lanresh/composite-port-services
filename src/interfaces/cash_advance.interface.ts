export enum status {
    PENDING = 'Pending',
    APPROVED = 'Approved',
}

export interface CashAdvance {
    cash_id: number;
    project_code: string;
    project_name: string;
    cash_advance_type: string;
    request_code: string;
    staff_id: string;
    staff_name: string;
    amount_collected: number;
    amount_recorded: number;
    balance: number;
    status: string;
    purpose: string;
    bank_to: string;
    payment_method: string
}
