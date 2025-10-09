import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./src/db/schemas/tweet.schema.ts", // Schema for tweets table
    "./src/db/schemas/user.schema.ts", // Schema for users table
  ],
  out: "",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "twitter",
    port: 5432,
  },
  verbose: true,
});
