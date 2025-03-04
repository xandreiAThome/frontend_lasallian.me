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

import { MessageSquareText } from "lucide-react";

import { Input } from "~/components/ui/input";
import CommentsCard from "./commentsCard";

interface inputData {
  commentsList: {
    profile: { author: string; profile: string };
    reactions: number;
    comments: number;
    time: Date;
    content: string;
  }[];
}

interface commentsData {
  profile: { author: string; profile: string };
  reactions: number;
  comments: number;
  time: Date;
  content: string;
}

export default function CommentsDialog({ commentsList }: inputData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center hover:bg-slate-200 hover:rounded-md px-2 hover:cursor-pointer">
          <button className="mr-2">
            <MessageSquareText className="h-[28px] w-[27.45px]" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{12} </span>
            comments
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader></DialogHeader>
        <div className="flex text-base text-justify flex-col">
          <div className="flex flex-col !ml-0">
            {commentsList &&
              commentsList.map(
                ({
                  profile,
                  comments,
                  time,
                  content,
                  reactions,
                }: commentsData) => {
                  return (
                    <CommentsCard
                      profile={profile}
                      comments={comments}
                      time={time}
                      content={content}
                      reactions={reactions}
                    />
                  );
                }
              )}
          </div>
        </div>
        <hr className="-mx-6" />
        <DialogFooter className="">
          <Input
            placeholder="What's YOUR thoughts on this post?"
            className="text-base md:text-base bg-gray-200 px-8 py-4 mt-6 rounded-3xl !ml-0"
          ></Input>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
