import { Dot } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import OrgPostDialog from "./orgPostDialog";
import { useNavigate } from "react-router";
import { use } from "react";
import { Button } from "~/components/ui/button";
import CommentsDialog from "./commentsDialog";
import ReactionsCard from "./reactionsCard";

interface postsData {
  author: string;
  time: Date;
  views: number;
  profile: string;
  content: string;
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

TimeAgo.addDefaultLocale(en);

export default function OrgPostCard({
  author,
  time,
  views,
  content,
  reactions,
  profile,
  comments,
  reposts,
  img,
  org,
  position,
  commentsList,
}: postsData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();

  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate("/orgprofile");
          }}
        >
          <img
            src={profile}
            alt="profile"
            width="36"
            height="36"
            className="rounded-full mr-4"
          />
        </button>
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

      {/** CONTENT */}
      <OrgPostDialog
        author={author}
        time={time}
        views={views}
        profile={profile}
        content={content}
        reactions={reactions}
        comments={comments}
        reposts={reposts}
        img={img}
        org={org}
        position={position}
        commentsList={commentsList}
      />

      <hr className="-mx-6" />

      <div className="flex items-center mt-4 justify-between gap-4">
        <div className="flex items-center">
          <ReactionsCard reactions={reactions}></ReactionsCard>
        </div>

        <CommentsDialog commentsList={commentsList} />

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
    </div>
  );
}
