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
]);

app.listen();
