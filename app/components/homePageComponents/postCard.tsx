import {
  CalendarDays,
  ChevronDown,
  Dot,
  Images,
  Send,
  Terminal,
} from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import PostDialog from "./postDialog";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useState, type JSX } from "react";
import ReactionsCard from "./reactionsCard";
import { Input } from "../ui/input";
import type { postDataInterface, commentInterface } from "~/lib/interfaces";
import profileImg from "~/components/assets/profile.jpg";
import EditPostDialog from "./editPostDialog";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

TimeAgo.addDefaultLocale(en);

export default function PostCard(props: postDataInterface) {
  const {
    title,
    content,
    media,
    type,
    visibility,
    meta,
    author,
    comments,
    _id,
  } = props;

  // Compatibility variables for existing code
  const img = media?.[0];
  const views = 0; // Default value as it's not in the new interface
  const reactions = 0; // Default value as it's not in the new interface
  const commentsNum = comments && Array.isArray(comments) ? comments.length : 0; // Default value as it's not in the new interface
  const reposts = 0; // Default value as it's not in the new interface
  const commentsList: commentInterface[] = []; // Default value as it's not in the new interface
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const [typeComment, setTypeComment] = useState(false);
  // TEMP

  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate(`/userprofile/${author._id}`);
          }}
        >
          <img
            src={
              author.vanity.display_photo
                ? author.vanity.display_photo
                : profileImg
            }
            alt="profile"
            width="36"
            height="36"
            className="rounded-full mr-4"
          />
        </button>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center">
            <Button
              onClick={() => {
                navigate(`/userprofile/${author._id}`);
              }}
              variant="link"
              className="text-lg text-black font-bold mr-2 p-0"
            >
              {author.info.name.first} {author.info.name.last}
            </Button>{" "}
            <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
              LSCS {/** TEMPORARY */}
            </p>
            <p className="px-2 bg-[#313131] text-white text-xs font-semibold">
              VP {/** TEMPORARY */}
            </p>
            <EditPostDialog postData={props} isModal={false} />
          </div>
          <div className="flex items-start">
            <p className="text-gray-400 text-xs">{author.info.username}</p>

            <div className="ml-auto flex items-center">
              <p className="text-gray-400 text-xs">
                <ReactTimeAgo date={meta.created_at} locale="en-SG" />
              </p>
              <Dot className="text-gray-500" />
              <p className="text-gray-400 text-xs">
                {formatter.format(views)} views
              </p>
            </div>
          </div>
        </div>
      </div>

      {/** CONTENT */}
      <PostDialog {...props} />

      <hr className="-mx-6" />

      <div className="flex items-center mt-4 justify-between gap-4">
        <div className="flex items-center">
          <ReactionsCard reactions={reactions} />
        </div>

        <button
          className="flex items-center hover:bg-slate-200 hover:rounded-md px-2 hover:cursor-pointer gap-2"
          onClick={() => setTypeComment(!typeComment)}
        >
          <MessageSquareText className="h-[28px] w-[27.45px]" />

          <p className="text-sm">
            <span className="font-bold">{commentsNum}</span> comments
          </p>
        </button>

        <div className="flex items-center hover:cursor-pointer hover:bg-slate-200 hover:rounded-md px-2">
          <button className="mr-2">
            <MessageSquareShare className="h-[28px] w-[27.45px]" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(commentsNum)} </span>
            reposts
          </p>
        </div>
      </div>
      {typeComment && (
        <div className="flex relative">
          <Input
            placeholder="What's YOUR thoughts on this post?"
            className="text-base md:text-base bg-gray-200 px-8 py-4 mt-4 rounded-3xl !ml-0"
          ></Input>
          <button>
            <Send className="absolute bottom-2 m-auto right-4 text-gray-500 h-5"></Send>
          </button>
        </div>
      )}
    </div>
  );
}
