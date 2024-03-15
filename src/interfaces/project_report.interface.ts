export interface ProjectReport{
    id: number;
    report_code: string;
    report_type: string;
    created_for: string;
    project_name: string;
    project_code: string;
    project_supervisor: string;
    report_summary: string;
    challenges: string;
    solutions: string;
    recommendation: string;
    weekly_projection: string;
    materials_required_for_projection: string;
    materials_on_site: string;
    status: string;
    submitted_by: string;
    submitted_on: string;
    visitor: string;
    weather: string;
    photograph_id: string[];
    createdBy: string;
}
