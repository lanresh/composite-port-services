export interface StaffPrivilege {
    id: number;
    staff_id: string;
    type : string;
    can_view : number;
    can_edit : number;
    can_delete : number;
    can_create : number;
   
}
