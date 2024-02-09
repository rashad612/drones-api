import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}` || 'postgres',
  port: parseInt(`${process.env.DATABASE_PORT}`),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/db/*{.ts,.js}"],
});
