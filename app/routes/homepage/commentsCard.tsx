import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";

import {
  Dot,
  Ellipsis,
  Heart,
  MessageSquareShare,
  MessageSquareText,
  Terminal,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import { Input } from "~/components/ui/input";

export default function CommentsCard() {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };

  return (
    <div className="flex items-start mt-6 !ml-0">
      <img
        src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
        alt="profile"
        width="36"
        height="36"
        className="rounded-full mr-4"
      />
      <div className="flex flex-col flex-grow">
        <div className="flex items-center">
          <p className="text-lg font-bold mr-2">{dummyComment.author}</p>{" "}
          <p className="text-gray-400 text-xs">
            <ReactTimeAgo date={dummyComment.time} locale="en-SG" />
          </p>
          <button className="ml-auto text-gray-500">
            <Ellipsis />
          </button>
        </div>

        <div className="flex items-start">
          <p>{dummyComment.content}</p>
        </div>

        <div className="flex gap-4 mt-2">
          <div className="flex items-center">
            <button className="mr-2">
              <Heart className="h-4" />
            </button>
            <p className="text-sm">
              <span className="font-bold">
                {formatter.format(dummyComment.reactions)}{" "}
              </span>
            </p>
          </div>

          <div className="flex items-center">
            <button className="mr-2">
              <MessageSquareText className="h-4" />
            </button>
            <p className="text-sm">
              <span className="font-bold">
                {formatter.format(dummyComment.replies)}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
