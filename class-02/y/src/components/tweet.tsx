import Link from "next/link";
import { Tweet as ITweet } from "../types/tweet.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/format-date";

type TweetProps = {
  tweet: ITweet;
};

export default function Tweet({ tweet }: TweetProps) {
  return (
    <div className="flex flex-row p-4 gap-4 border-b-[1px] border-gray-600">
      {/* Avatar Column */}
      <div>
        <Link href={`/${tweet.author.username}`}>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-12 h-12 rounded-full"
            />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      {/* Main Content Column */}
      <div className="w-full flex flex-col">
        {/* Header row: name, username, separator, timestamp */}
        <div className="flex flex-row gap-2 items-center">
          {/* Username (handle) */}
          <h1 className="font-bold">
            <Link href={`/${tweet.author.username}`}>
              @{tweet.author.username}
            </Link>
          </h1>
          {/* Small separator. (-) */}
          <div className="text-slate-500 flex items-center justify-center">
            <div>-</div>
          </div>
          {/* Timestamp - link to the tweet's dedicated page */}
          <p className="text-slate-500 hover:underline">
            <Link href={`/tweet/${tweet.id}`}>
              {formatDate(tweet.createdAt)}
            </Link>
          </p>
        </div>

        <p>{tweet.text}</p>

        {/* Actions row: reply, repost, like, open link */}
        <div className="flex flex-row gap-4 items-center mt-2 justify-between">
          <div className="flex flex-row gap-2 items-center">
            <ChatBubbleOvalLeftIcon className="size-7 text-slate-500 cursor-pointer" />
            <span>1</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <ArrowPathRoundedSquareIcon className="size-7 text-slate-500 cursor-pointer" />
            <span>2</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <HeartIcon className="size-7 text-slate-500 cursor-pointer" />
            <span>3</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Link href={`/tweet/${tweet.id}`}>
              <LinkIcon className="size-7 text-slate-500 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
