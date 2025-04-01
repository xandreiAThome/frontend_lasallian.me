import { Dot, MessageSquareShare, MessageSquareText, Send } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import type { commentInterface, postDataInterface } from "~/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentsCard from "./commentsCard";
import EditPostDialog from "./editPostDialog";
import ReactionsCard from "./reactionsPostCard";

const parseHashtags = (text: string) => {
  const hashtagRegex = /#(\w+)/g;
  
  // Replace hashtags with dynamic links
  return text.split(hashtagRegex).map((part, index) => {
    if (index % 2 === 1) {
      // If it's a hashtag (i.e., odd index in the array)
      return <a href={`/hashtag/${part}`} className="text-blue-500 hover:text-blue-700 underline">{`#${part}`}</a>;
    }
    // Normal text (even index in the array)
    return part;
  });
};

export default function PostDialog(props: postDataInterface) {
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
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };
  const loaderData = useLoaderData();

  // Compatibility variables for existing code
  const views = 0; // Default value as it's not in the new interface
  const commentsNum = comments && Array.isArray(comments) ? comments.length : 0; // Default value as it's not in the new interface
  const reposts = 0; // Default value as it's not in the new interface
  const commentsList: commentInterface[] = []; // Default value as it's not in the new interface
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  const [img, setImg] = useState<string | null>(null);
  const [submitComment, setSubmitComment] = useState("");
  const fetcher = useFetcher();
  const location = useLocation();
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

  // TEMP

  useEffect(() => {
    async function getImg() {
      if (media.length > 0) {
        try {
          const response = await fetch(`${media[0]}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
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
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex text-base text-justify my-4 flex-col">
          <p className="mb-2">{parseHashtags(content.text)}</p>
          <div className="-mx-6 flex justify-center">
            {media.length > 0 && (
              <img src={img ?? ""} alt="image content" className=""></img>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] max-h-screen overflow-y-auto hide-scroll">
        <DialogHeader>
          <div className="flex items-center mt-4">
            <button
              onClick={() => {
                navigate(`/userprofile/${author._id}`);
              }}
            >
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage alt="@shadcn" src={profileImg ?? ""} />
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
        </DialogHeader>
        <div className="flex text-base text-justify flex-col">
          <p className="mb-2 whitespace-pre-wrap">{parseHashtags(content.text)}</p>
          <div className="-mx-6 flex justify-center">
            {media.length > 0 && (
              <img
                src={img ?? undefined}
                alt="image content"
                className=""
              ></img>
            )}
          </div>
        </div>
        <hr className="-mx-6" />
        <DialogFooter className="sm:justify-center sm:flex-col flex-col">
          <div className="flex justify-between flex-1 gap-4">
            <div className="flex items-center">
              <ReactionsCard
                reactions={reactions.length}
                position="right"
                postId={_id}
                currUserReact={reactions.find(
                  (reaction) => reaction.user === loaderData.user._id
                )}
              />
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

          <Form className="flex relative mb-4" onSubmit={handleComment}>
            <Input
              placeholder="What's YOUR thoughts on this post?"
              className="text-base md:text-base bg-gray-200 px-8 py-4 mt-4 rounded-3xl !ml-0"
              name="content"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setSubmitComment(e.target.value);
              }}
              value={submitComment}
            ></Input>
            <button type="submit">
              <Send className="absolute bottom-2 m-auto right-4 text-gray-500 h-5"></Send>
            </button>
          </Form>

          <div className="flex flex-col !ml-0 gap-2">
            {comments &&
              comments.map((comment, index) => (
                <CommentsCard
                  key={index}
                  author={comment.author}
                  content={comment.content}
                  post={comment.post}
                  meta={comment.meta}
                  _id={comment._id}
                  reactions={comment.reactions}
                />
              ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
