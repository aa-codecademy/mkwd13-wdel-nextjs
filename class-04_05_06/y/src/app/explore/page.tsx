"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Tweet } from "@/types/tweet.interface";
import Tweets from "@/components/tweets";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    console.log("Search term has changed", searchTerm);

    fetch(`http://localhost:3000/api/tweets?searchTerm=${searchTerm}`)
      .then((res) => res.json())
      .then((tweetsResponse) => setTweets(tweetsResponse));
  }, [searchTerm]);

  return (
    <div>
      <div className="p-4">
        <Input
          placeholder="Search..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Tweets tweets={tweets} />
      </div>
    </div>
  );
}
