import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

export const config = {
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    typeorm: {
      type: 'postgres',
      host: `${process.env.DATABASE_HOST}`,
      port: `${process.env.DATABASE_PORT}`,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ["dist/db/*{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: false,
      cli: {
        migrationsDir: './db/',
      },
    },
};

export default registerAs('config', () => config);
export const connectionSource = new DataSource(config.typeorm as DataSourceOptions);