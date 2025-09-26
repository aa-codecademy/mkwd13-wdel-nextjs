import { eq, ilike } from "drizzle-orm";
import { db } from "../db";
import {
  TweetCreateModel,
  TweetModel,
  tweets,
} from "@/db/schemas/tweet.schema";

export const find = (searchTerm: string | null): Promise<TweetModel[]> => {
  try {
    // ilike(...) produces a SQL `ILIKE` expression (Postgres) for case-insensitive search.
    return db.query.tweets.findMany({
      where: ilike(tweets.text, `%${searchTerm ?? ""}`),
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
};

export const findOneById = (id: string) => {
  try {
    // eq(tweets.id, id) translates to SQL "WHERE id = $param" (parameterized).
    // findFirst() returns the first match (or 'null'/'undefined' depending on the drizzle version)
    return db.query.tweets.findFirst({
      where: eq(tweets.id, id),
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = (tweet: TweetCreateModel): Promise<TweetModel> => {
  return db
    .insert(tweets) // prepare INSERT into the 'tweet' table
    .values(tweet) // values to insert (TweetCreateModel)
    .returning() // ask Postgres to return the inserted row(s)
    .then((res) => res?.[0]); // take the first element of the return array
};
