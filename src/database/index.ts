import path, { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createConnection, ConnectionOptions } from 'typeorm';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE } from '@config';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  database: POSTGRES_DATABASE,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
