import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./src/db/schemas/tweet.schema.ts", // Schema for tweets table
    "./src/db/schemas/user.schema.ts", // Schema for users table
    "./src/db/schemas/users_follows.schema.ts", // Schema for users follows
    "./src/db/schemas/user_liked_tweets.ts", //Schema for users likes
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
