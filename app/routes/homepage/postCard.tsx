import { Dot } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import PostDialog from "./postDialog";

interface postsData {
  author: string;
  username: string;
  time: Date;
  views: string;
  content: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
}

TimeAgo.addDefaultLocale(en);

export default function PostCard({
  author,
  username,
  time,
  views,
  content,
  reactions,
  comments,
  reposts,
  img,
  org,
  position,
}: postsData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <img
          src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          alt="profile"
          width="36"
          height="36"
          className="rounded-full mr-4"
        />
        <div className="flex flex-col flex-grow">
          <div className="flex items-center">
            <p className="text-lg font-bold mr-2">{author}</p>{" "}
            <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
              {org}
            </p>
            <p className="px-2 bg-[#313131] text-white text-xs font-semibold">
              {position}
            </p>
            <button className="ml-auto text-gray-500">
              <Ellipsis />
            </button>
          </div>
          <div className="flex items-start">
            <p className="text-gray-400 text-xs">{username}</p>

            <div className="ml-auto flex items-center">
              <p className="text-gray-400 text-xs">
                <ReactTimeAgo date={time} locale="en-SG" />
              </p>
              <Dot className="text-gray-500" />
              <p className="text-gray-400 text-xs">{views}</p>
            </div>
          </div>
        </div>
      </div>

      {/** CONTENT */}
      <PostDialog
        key={username}
        author={author}
        username={username}
        time={time}
        views={views}
        content={content}
        reactions={reactions}
        comments={comments}
        reposts={reposts}
        img={img}
        org={org}
        position={position}
      />

      <hr className="-mx-6" />

      <div className="flex items-center mt-4 justify-between">
        <div className="flex items-center">
          <button className="mr-2">
            <Heart className="h-6" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(reactions)} </span>
            reactions
          </p>
        </div>

        <div className="flex items-center">
          <button className="mr-2">
            <MessageSquareText className="h-6" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(comments)} </span>
            comments
          </p>
        </div>

        <div className="flex items-center">
          <button className="mr-2">
            <MessageSquareShare className="h-6" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(comments)} </span>
            reposts
          </p>
        </div>
      </div>
    </div>
  );
}
