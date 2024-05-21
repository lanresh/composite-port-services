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
    status: status;
    description: string;
    decision: string;
    decision_reason: string;
    bank_to: string;
    payment_method: string;
    action_type: string;
    action_by: string;
    unused_cash: number;
}
