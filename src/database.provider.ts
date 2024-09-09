import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const currentFile = __filename.split('.');

const currentFileExt = currentFile[currentFile.length - 1];
const DB_PORT = Number(process.env.DB_PORT) || 5433;

const dbCredentials = {
  host: process.env.DB_HOST as string,
  port: DB_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,

  ...(process.env.DEV_URL !== 'localhost' && {
    ssl: {
      // temporary fix
      rejectUnauthorized: false,
    },
  }),
};

const config: DataSourceOptions = {
  type: 'postgres',
  ...dbCredentials,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + `/modules/**/*.entity.${currentFileExt}`],
  migrations: [__dirname + `/migrations/*.${currentFileExt}`],
  migrationsTableName: 'new_migrations',
};

export const DatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const appDataSource = new DataSource(config);

      return appDataSource.initialize();
    },
  },
];
