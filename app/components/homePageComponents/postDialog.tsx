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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  ChevronDown,
  Dot,
  Ellipsis,
  Heart,
  MessageSquareShare,
  MessageSquareText,
  Send,
  Terminal,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import { Input } from "~/components/ui/input";
import CommentsCard from "./commentsCard";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ReactionsCard from "./reactionsCard";
import type { commentInterface, postDataInterface } from "~/lib/interfaces";
import profileImg from "~/components/assets/profile.jpg";
import EditPostDialog from "./editPostDialog";
import api from "~/lib/api";
import axios from "axios";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

interface commentsData {
  profile: { author: string; profile: string };
  reactions: number;
  comments: number;
  time: Date;
  content: string;
}

export default function PostDialog(props: postDataInterface) {
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
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };
  const loaderData = useLoaderData();

  // TEMP
  const positionsTEMP = [
    {
      org: "LSCS",
      position: "VP",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "LSCS",
      position: "RND",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "TLS",
      position: "WEB",
      orgColor: "#007D3F",
      positionColor: "#313131",
    },
    {
      org: "GDSC",
      position: "MKT",
      orgColor: "#FFCD05",
      positionColor: "#313131",
    },
  ];
  const posDIVS = positionsTEMP.map(
    ({ org, position, orgColor, positionColor }: positionsData) => {
      return (
        <DropdownMenuRadioItem value={`${org}+${position}`}>
          <p
            style={{ backgroundColor: orgColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {org}
          </p>
          <p
            style={{ backgroundColor: positionColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {position}
          </p>
        </DropdownMenuRadioItem>
      );
    }
  );

  // Compatibility variables for existing code
  const views = 0; // Default value as it's not in the new interface
  const reactions = 0; // Default value as it's not in the new interface
  const commentsNum = comments && Array.isArray(comments) ? comments.length : 0; // Default value as it's not in the new interface
  const reposts = 0; // Default value as it's not in the new interface
  const commentsList: commentInterface[] = []; // Default value as it's not in the new interface
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const [typeComment, setTypeComment] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  // TEMP

  useEffect(() => {
    async function getImg() {
      if (media.length > 0) {
        try {
          const response = await fetch(`${media[0]}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    getImg();
    console.log("hi");
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex text-base text-justify my-4 flex-col">
          <p className="mb-2">{content.text}</p>
          <div className="-mx-6 flex justify-center">
            {media.length > 0 && (
              <img src={img ?? ""} alt="image content" className=""></img>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <div className="flex items-center mt-4">
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
                <EditPostDialog {...props} />
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
        </DialogHeader>
        <div className="flex text-base text-justify flex-col">
          <p className="mb-2 whitespace-pre-wrap">{content.text}</p>
          <div className="-mx-6 flex justify-center">
            {media.length > 0 && (
              <img src={img ?? ""} alt="image content" className=""></img>
            )}
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
                <span className="font-bold">
                  {formatter.format(commentsNum)}{" "}
                </span>
                comments
              </p>
            </div>

            <div className="flex items-center hover:bg-slate-200 hover:rounded-md px-2 cursor-pointer">
              <button className="mr-2">
                <MessageSquareShare className="h-[28px] w-[27.45px]" />
              </button>
              <p className="text-sm">
                <span className="font-bold">{formatter.format(reposts)} </span>
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
            {comments &&
              comments.map((comment, index) => (
                <CommentsCard
                  key={index}
                  author={comment.author}
                  content={comment.content}
                  post={comment.post}
                  meta={comment.meta}
                  _id={comment._id}
                />
              ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
