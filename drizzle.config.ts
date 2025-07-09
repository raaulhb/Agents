import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.ts";

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schema/**.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
// This configuration file is used by Drizzle ORM to generate migrations and manage the database schema.
// It specifies the database dialect, casing convention, schema files, output directory for migrations, and database credentials.
