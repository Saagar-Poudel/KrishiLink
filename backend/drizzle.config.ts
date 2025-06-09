import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/userModel.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL as string,
    ssl: { rejectUnauthorized: false },
  },
  verbose: true,
});