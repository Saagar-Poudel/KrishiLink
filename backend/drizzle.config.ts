import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();
// This configuration file is used to define the settings for Drizzle ORM
export default defineConfig({
  schema: './src/models/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL as string,
    ssl: { rejectUnauthorized: false },
  },
  verbose: true,
});