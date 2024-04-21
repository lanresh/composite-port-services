import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from './routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { StaffRoute } from './routes/staff.route';
import { ProjectRoute } from './routes/project.route';
import { ClientRoute } from './routes/client.route';
import { ProjectReportRoute } from './routes/project_report.route';
import { SupplierRoute } from './routes/supplier.route';
import { SupplierMaterialRoute } from './routes/supplier_material.route';
import { SupplierToolsMachineryRoute } from './routes/supplier_tools_machinery.route';
import { InventoryRoute } from './routes/inventory.route';
import { ContractorRoute } from './routes/contractor.route';
import { ContractorProjectRoute } from './routes/contractor_project.route';
import { RequestRoute } from './routes/request.route';
import { CashAdvanceRoute } from './routes/cash_advance.route';
import { CashAdvanceBreakdownRoute } from './routes/cash_advance_breakdown.route';
import { ProjectFlatsRoute } from './routes/project_flats.route';
import { StartupCostRoute } from './routes/startup_cost.route';
import { StakeholderRoute } from './routes/stakeholder.route';
import { StakeholderProjectRoute } from './routes/stakeholder_project.route';
import { DashboardRoute } from './routes/dashboard.route';
import { TenantRoute } from './routes/tenant.route';
import { WorkerJobsRoute } from './routes/worker_jobs.route';
import { WorkerRoute } from './routes/worker.route';
import { ToolFromStoreRoute } from './routes/tool_from_store.route';
import { ConsultantRoute } from './routes/consultant.route';
import { ConsultantProjectRoute } from './routes/consultant_project.route';
import { ClientFlatRoute } from './routes/client_flat.route';
import { ClientProjectRoute } from './routes/client_project.route';
import { ProjectTeamRoute } from './routes/project_team.route';
import { ProjectCommentRoute } from './routes/project_comment.route';
import { MaterialRoute } from './routes/material.route';
import { WorkerProjectRoute } from './routes/worker_project.route';

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new StaffRoute(),
  new ClientRoute(),
  new ProjectRoute(),
  new ProjectReportRoute(),
  new SupplierRoute(),
  new SupplierMaterialRoute(),
  new SupplierToolsMachineryRoute(),
  new InventoryRoute(),
  new ContractorRoute(),
  new ContractorProjectRoute(),
  new RequestRoute(),
  new CashAdvanceRoute(),
  new CashAdvanceBreakdownRoute(),
  new StartupCostRoute(),
  new ProjectFlatsRoute(),
  new StakeholderRoute(),
  new StakeholderProjectRoute(),
  new DashboardRoute(),
  new TenantRoute(),
  new WorkerJobsRoute(),
  new WorkerRoute(),
  new ToolFromStoreRoute(),
  new ConsultantRoute(),
  new ConsultantProjectRoute(),
  new ClientFlatRoute(),
  new ClientProjectRoute(),
  new ProjectTeamRoute(),
  new ProjectCommentRoute(),
  new MaterialRoute(),
  new WorkerProjectRoute(),
]);

app.listen();
