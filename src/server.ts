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
  new ProjectFlatsRoute()
]);

app.listen();
