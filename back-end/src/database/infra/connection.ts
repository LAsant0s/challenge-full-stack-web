import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

export const createConnection = async (): Promise<Pool> => {
  const connection = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
  });

  await connection.connect();

  return connection;
}