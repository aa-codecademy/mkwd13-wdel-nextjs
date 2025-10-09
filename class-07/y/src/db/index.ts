import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { tweets, tweetsRelations } from "./schemas/tweet.schema";
import { users, usersRelations } from "./schemas/user.schema";
import {
  follows,
  usersFollowersRelations,
} from "./schemas/users_follows.schema";
import {
  usersLikedTweets,
  usersLikedTweetsRelations,
} from "./schemas/user_liked_tweets";

const client = postgres({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "twitter",
  port: 5432,
});

export const db = drizzle(client, {
  schema: {
    tweets,
    users,
    tweetsRelations,
    follows,
    usersLikedTweets,
    usersRelations,
    usersFollowersRelations,
    usersLikedTweetsRelations,
  },
  logger: true,
});

export type Db = typeof db;
