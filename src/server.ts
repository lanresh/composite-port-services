import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from './routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ClientRoute } from './routes/client.route';

ValidateEnv();

const app = new App([
    new ClientRoute(), 
    new AuthRoute(), 
    new UserRoute()

]);

app.listen();
