import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  Dot,
  MessageSquareShare,
  MessageSquareText,
  Send
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Form,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import ReactTimeAgo from "react-time-ago";
import profileImgDefault from "~/components/assets/profile.jpg";
import { Button } from "~/components/ui/button";
import type { commentInterface, postDataInterface } from "~/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import EditPostDialog from "./editPostDialog";
import PostDialog from "./postDialog";
import ReactionsPostCard from "./reactionsPostCard";

TimeAgo.addDefaultLocale(en);

// TODO ADD BADGE
export default function PostCard(props: postDataInterface) {
  const {
    title,
    content,
    media,
    type,
    visibility,
    meta,
    author,
    badge,
    comments,
    reactions,
    _id,
  } = props;

  // Compatibility variables for existing code
  const views = 0; // Default value as it's not in the new interface
  const commentsNum = comments && Array.isArray(comments) ? comments.length : 0; // Default value as it's not in the new interface
  const reposts = 0; // Default value as it's not in the new interface
  const commentsList: commentInterface[] = []; // Default value as it's not in the new interface
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const [typeComment, setTypeComment] = useState(false);
  const fetcher = useFetcher();
  const location = useLocation();
  const [submitComment, setSubmitComment] = useState("");
  const loaderData = useLoaderData();
  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    async function getImg() {
      if (author.vanity.display_photo) {
        try {
          const response = await fetch(`${author.vanity.display_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setProfileImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    getImg();
  }, [author.vanity.display_photo]);

  function handleComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Append data to FormData
    // formData.append("content", formData.get("content") as string);
    formData.append("location", location.pathname);
    formData.append("post_id", _id);

    setSubmitComment("");

    // Submit the formatted data
    fetcher.submit(formData, {
      method: "post",
      action: "/createComment",
      encType: "multipart/form-data",
    });
  }

  // TODO: Remove ? on badge when db refactoring is complete
  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate(`/userprofile/${author._id}`);
          }}
        >
          <Avatar className="w-10 h-10 mr-2">
            <AvatarImage alt="@shadcn" src={profileImg ?? undefined} />
            <AvatarFallback className="flex flex-col bg-gray-300">
              <img src={profileImgDefault} alt="" />
            </AvatarFallback>
          </Avatar>
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
            {badge ? (
              <>
              <p
                style={{ backgroundColor: badge?.main_color,
                          color: badge?.main_text_color,
                }}
                className="px-2 text-xs font-semibold">
                {badge?.main_title}
              </p>
              <p 
                style={{ backgroundColor: badge?.sub_color,
                          color: badge?.sub_text_color,
                }}
                className="px-2 text-xs font-semibold">
                {badge?.sub_title}
              </p>
              </>
            ) : null}
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

      {/** CONTENT */}
      <PostDialog {...props} />

      <hr className="-mx-6" />

      <div className="flex items-center mt-4 justify-between gap-4">
        <div className="flex items-center">
          <ReactionsPostCard reactions={reactions.length} postId={_id} />
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
            <span className="font-bold">0 </span>
            reposts
          </p>
        </div>
      </div>
      {typeComment && (
        <Form className="flex relative" onSubmit={handleComment}>
          <Input
            placeholder="What's YOUR thoughts on this post?"
            className="text-base md:text-base bg-gray-200 px-8 py-4 mt-4 rounded-3xl !ml-0"
            name="content"
            type="text"
            autoComplete="off"
            onChange={(e) => setSubmitComment(e.target.value)}
            value={submitComment}
          ></Input>
          <button type="submit">
            <Send className="absolute bottom-2 m-auto right-4 text-gray-500 h-5"></Send>
          </button>
        </Form>
      )}
    </div>
  );
}
