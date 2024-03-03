export enum STATUS {
    VACANT = 'Vacant',
    OCCUPIED = 'Occupied'
}


export interface ProjectFlats {
    flat_id: number;
    flat_code: string;
    project_name: string;
    project_code: string;
    flat_desc: string;
    comment: string;
    status: STATUS;
}
