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
  Send,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import { Input } from "~/components/ui/input";
import CommentsCard from "./commentsCard";
import { useNavigate } from "react-router";
import ReactionsCard from "./reactionsPostCard";

interface postsData {
  author: string;
  time: Date;
  views: number;
  content: string;
  profile: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
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

export default function OrgPostDialog({
  author,
  time,
  views,
  content,
  profile,
  reactions,
  comments,
  reposts,
  img,
  org,
  position,
  commentsList,
}: postsData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };

  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex text-base text-justify my-4 flex-col">
          <p className="mb-2">{content}</p>
          <div className="-mx-6">
            {img && <img src={img} alt="image content" className=""></img>}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <div className="flex items-center">
            <img
              src={profile}
              alt="profile"
              width="36"
              height="36"
              className="rounded-full mr-4"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    navigate("/orgprofile");
                  }}
                  className="text-lg text-black font-bold mr-2 p-0 hover:underline"
                >
                  {author}
                </button>{" "}
                <button className="ml-auto text-gray-500">
                  <Ellipsis />
                </button>
              </div>
              <div className="flex items-start">
                <div className="flex">
                  <p className="px-2 bg-lasalle-green text-white text-xs font-semibold">
                    {org}
                  </p>
                  <p className="px-2 bg-[#313131] text-white text-xs font-semibold">
                    {position}
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  <p className="text-gray-400 text-xs">
                    <ReactTimeAgo date={time} locale="en-SG" />
                  </p>
                  <Dot className="text-gray-500" />
                  <p className="text-gray-400 text-xs">
                    {formatter.format(views)} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="flex text-base text-justify flex-col">
          <p className="mb-2 whitespace-pre-wrap">{content}</p>
          <div className="-mx-6">
            {img && <img src={img} alt="image content" className=""></img>}
          </div>
        </div>
        <hr className="-mx-6" />
        <DialogFooter className="sm:justify-center sm:flex-col flex-col">
          <div className="flex justify-between flex-1 gap-4">
            <div className="flex items-center">
              <ReactionsCard reactions={reactions}></ReactionsCard>
            </div>

            <div className="flex items-center">
              <button className="mr-2">
                <MessageSquareText className="h-[28px] w-[27.45px]" />
              </button>
              <p className="text-sm">
                <span className="font-bold">{formatter.format(comments)} </span>
                comments
              </p>
            </div>

            <div className="flex items-center hover:bg-slate-200 hover:rounded-md px-2 cursor-pointer">
              <button className="mr-2">
                <MessageSquareShare className="h-[28px] w-[27.45px]" />
              </button>
              <p className="text-sm">
                <span className="font-bold">{formatter.format(comments)} </span>
                reposts
              </p>
            </div>
          </div>

          <div className="flex relative">
            <Input
              placeholder="What's YOUR thoughts on this post?"
              className="text-base md:text-base bg-gray-200 px-8 py-4 my-6 rounded-3xl !ml-0"
            ></Input>
            <button>
              <Send className="absolute top-0 bottom-0 m-auto right-4 text-gray-500 h-5"></Send>
            </button>
          </div>

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
                      key={content}
                    />
                  );
                }
              )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
