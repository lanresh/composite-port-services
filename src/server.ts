import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from './routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { StaffRoute } from './routes/staff.route';
import { ProjectRoute } from './routes/project.route';
import { ClientRoute } from './routes/client.route';
import { ProjectReportRoute } from './routes/project_report.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new StaffRoute(), new ClientRoute(), new ProjectRoute(), new ProjectReportRoute()]);

app.listen();
