import { Tweet as ITweet } from "../types/tweet.interface";
import Tweet from "./tweet";

type TweetProps = {
  tweets: ITweet[];
};

export default function Tweets({ tweets }: TweetProps) {
  return (
    <div>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
