import { CalendarDays, ChevronDown, Dot, Images, Terminal } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import PostDialog from "./postDialog";
import CommentsDialog from "./commentsDialog";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
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
import { useState, type JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

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
  const [currPos, setCurrPos] = useState("LSCS+VP");
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
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto text-gray-500">
                  <button>
                    <Ellipsis />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DialogTrigger>
                    {" "}
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DialogTrigger>

                  <DropdownMenuItem className="text-red-500">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                  <DialogTitle>
                    <h1 className="text-2xl">Edit</h1>
                    <h4 className="text-base font-normal">
                      Posting with{" "}
                      <span className="font-bold">
                        La Salle Computer Society - Vice President
                      </span>
                    </h4>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4 flex-col">
                  <div className="flex items-center">
                    <img
                      src={profile}
                      alt="profile"
                      width="36"
                      height="36"
                      className="rounded-full mr-4"
                    />
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        {" "}
                        <p className="text-lg font-bold mr-12">{author}</p>{" "}
                        <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                          {org}
                        </p>
                        <p className="px-2 bg-[#313131] text-white text-xs font-semibold mr-2">
                          {position}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button>
                              <ChevronDown className="font-extrabold" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              Panel Position
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={currPos}
                              onValueChange={setCurrPos}
                            >
                              {posDIVS}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-gray-400 text-xs">{username}</p>
                    </div>
                  </div>{" "}
                  <textarea
                    name="content"
                    id="content"
                    placeholder="Use “/” to add components"
                    rows={5}
                    className="bg-gray-100 rounded-2xl p-4 border-gray-200 border focus:outline-lasalle-green outline-none"
                  >
                    {content}
                  </textarea>
                </div>
                <DialogFooter className="sm:justify-between items-center">
                  <Button className="bg-lasalle-green rounded-3xl text-lg px-6">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

      <div className="flex items-center mt-4 justify-between gap-4">
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
