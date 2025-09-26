// So when a user asks for tweets:
// User -> Controller -> Service -> Repository -> Database
// ...and the data comes back the same way in reverse.

import {
  TweetCreateModel,
  TweetExtendedModel,
} from "@/db/schemas/tweet.schema";
import { create, find, findOneById } from "@/repositories/tweets.repository";

export const getTweets = async (searchTerm?: string | null) => {
  // call repository to get base tweets (type from repo: TweetModel[])
  const tweets = await find(searchTerm ?? null);

  return tweets as TweetExtendedModel[];
};

export const getTweetById = async (id: string) => {
  // Simple delegation to the repository.
  const tweet = await findOneById(id);

  return tweet;
};

export const createTweet = async (tweet: TweetCreateModel) => {
  // Call repository 'create' which performs the DB insert and returns the inserted row.
  const createdTweet = await create(tweet);

  console.log("created tweet: ", createdTweet);

  // Retrun the created row to the caller (controller or API route)
  return createdTweet;
};
