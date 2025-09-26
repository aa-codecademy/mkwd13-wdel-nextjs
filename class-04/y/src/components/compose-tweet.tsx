"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { TweetType } from "@/types/tweet-type.enum";
import { submitTweet } from "@/actions/create-tweet.action";
// import { TweetModel } from "@/db/schemas/tweet.schema";
// import { TweetType } from "@/types/tweet-type.enum";

export default function ComposeTweet({ onSubmit = () => void 0 }) {
  const [value, setValue] = useState("");
  // const [originalTweet, setOriginalTweet] = useState<TweetModel>();
  // const [type, setType] = useState<TweetType>(TweetType.Tweet);
  // const [repliedToId, setRepiledToId] = useState("");

  return (
    <div className="flex flex-row p-4 gap-4 border-b-2 border-gray-600">
      <div>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-12 h-12 rounded-full"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>
      <form
        className="w-full flex flex-col items-end"
        action={async (formData) => {
          await submitTweet(formData);

          onSubmit();
          setValue("");
        }}
      >
        <Textarea
          className="w-full border-t-0 border-l-0 border-r-0 rounded-none"
          placeholder="Compose your tweet..."
          name="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* <input type="hidden" /> */}
        <Button
          className="mt-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
          disabled={!value}
          type="submit"
        >
          Post
        </Button>
      </form>
    </div>
  );
}
