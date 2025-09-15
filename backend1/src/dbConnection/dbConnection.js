import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../models/schema.js'
import dotenv from 'dotenv';

dotenv.config();

const client = postgres(process.env.SUPABASE_DB_URL, {
  ssl: 'require',
});

export const db = drizzle(client, { schema });