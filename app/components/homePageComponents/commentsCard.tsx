import {
  Dot,
  Ellipsis,
  Heart,
  MessageSquareShare,
  MessageSquareText,
  Terminal,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface commentsData {
  profile: { author: string; profile: string };
  reactions: number;
  comments: number;
  time: Date;
  content: string;
}

export default function CommentsCard({
  profile,
  reactions,
  comments,
  time,
  content,
}: commentsData) {
  const navigate = useNavigate();
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };
  const [isEdit, setIsEdit] = useState(false);

  const EditComment = (
    <div>
      <textarea
        className="bg-gray-100 rounded-2xl p-4 border-gray-200 border focus:outline-lasalle-green outline-none w-full"
        name="edit"
        id="edit"
        rows={1}
      >
        {content}
      </textarea>
      <div>
        <p className="text-sm">
          {" "}
          Press{" "}
          <Button variant="link" onClick={() => setIsEdit(false)}>
            edit
          </Button>{" "}
          to save or Esc to
          <Button
            variant="link"
            onClick={() => setIsEdit(false)}
            className="text-red-500"
          >
            cancel
          </Button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex items-start mb-6 !ml-0">
      <button
        onClick={() => {
          navigate("/userprofile");
        }}
      >
        <img
          src={profile.profile}
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
            {profile.author}
          </Button>{" "}
          <p className="text-gray-400 text-xs">
            <ReactTimeAgo date={time} locale="en-SG" />
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto text-gray-500">
              <button>
                <Ellipsis />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isEdit ? (
          EditComment
        ) : (
          <div className="flex items-start">
            <p>{content}</p>
          </div>
        )}

        <div className="flex gap-4 mt-2">
          <div className="flex items-center">
            <button className="mr-2">
              <Heart className="h-4" />
            </button>
            <p className="text-sm">
              <span className="font-bold">{formatter.format(reactions)} </span>
            </p>
          </div>

          <div className="flex items-center">
            <button className="mr-2">
              <MessageSquareText className="h-4" />
            </button>
            <p className="text-sm">
              <span className="font-bold">{formatter.format(comments)} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
