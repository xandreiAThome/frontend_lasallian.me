import { Dot } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import PostDialog from "./postDialog";
import CommentsDialog from "./commentsDialog";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

interface postData {
  author: string;
  username: string;
  profile: string;
  time: Date;
  views: number;
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

export default function PostCard({
  author,
  username,
  profile,
  time,
  views,
  content,
  reactions,
  comments,
  reposts,
  img,
  org,
  position,
  commentsList,
}: postData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate("/userprofile");
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
            <Button
              onClick={() => {
                navigate("/userprofile");
              }}
              variant="link"
              className="text-lg text-black font-bold mr-2 p-0"
            >
              {author}
            </Button>{" "}
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
              <p className="text-gray-400 text-xs">
                {formatter.format(views)} views
              </p>
            </div>
          </div>
        </div>
      </div>

      {/** CONTENT */}
      <PostDialog
        key={username}
        author={author}
        username={username}
        profile={profile}
        time={time}
        views={views}
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

        <CommentsDialog commentsList={commentsList} />

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
