import { pgTable, uuid, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 30 }).notNull(),
    username: varchar("username", { length: 20 }).notNull(),
    password: varchar("password").notNull(),
    joinDate: timestamp("join_date", { withTimezone: true })
      .notNull()
      .defaultNow(),
    // Optional profile fields:
    url: varchar("url"),
    location: varchar("location"),
    description: varchar("description"),
    avatar: varchar("avatar"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({ unq: unique().on(t.username) })
);

// UserModel - the shape of a user record coming out of the database (SELECT result).
// InferSelectModel<typeof users> gives you the TypeScript type of rows you read from the users table (what SELECT returns)
export type UserModel = InferSelectModel<typeof users>;

// UserCreateModel - the shape of data you can (or must) provide when inserting a new row (INSERT input).
// InferInsertModel<typeof users> gives you the type you should pass when inserting into the users table (what INSERT accepts).
export type UserCreateModel = InferInsertModel<typeof users>;

// INSERT type: reflects which fields are required and which are optional during insertion
// SELECT type: reflects what the DB wil return after the row exists (with defaults applied).
