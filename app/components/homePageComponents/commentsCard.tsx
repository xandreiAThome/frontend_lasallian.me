import {
  Dot,
  Ellipsis,
  Heart,
  MessageSquareShare,
  MessageSquareText,
  Terminal,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import {
  Form,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { commentInterface } from "~/lib/interfaces";
import profileImgDefault from "~/components/assets/profile.jpg";
import ReactionsCommentCard from "./reactionsCommentCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CommentsCard({
  author,
  content,
  post,
  meta,
  _id,
  reactions,
}: commentInterface) {
  const navigate = useNavigate();
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const [isEdit, setIsEdit] = useState(false);
  const repliesNum = 0;
  const reactionsNum = 0;
  const fetcher = useFetcher();
  const location = useLocation();
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

  const handleDelete = () => {
    console.log("delete");

    // Format data as required by API
    const postData = {
      id: _id,
      location: location,
    };

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/deleteComment" }
    );
  };

  function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    console.log("edit");
    setIsEdit(false);
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Format data as required by API
    const postData = {
      content: formData.get("edit"),
      id: _id,
      location: location,
    };

    // Submit the formatted data
    fetcher.submit(
      { json: JSON.stringify(postData) },
      { method: "post", action: "/editComment" }
    );
  }

  const EditComment = (
    <div>
      <Form onSubmit={handleEdit}>
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
            <Button type="submit" variant="link">
              Save
            </Button>
            <Button
              variant="link"
              onClick={() => setIsEdit(false)}
              className="text-red-500"
              type="button"
            >
              Cancel
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );

  return (
    <div className="flex items-start !ml-0">
      <button
        onClick={() => {
          navigate("/userprofile");
        }}
      >
        <Avatar className="w-9 h-9 mr-2">
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
              navigate("/userprofile");
            }}
            variant="link"
            className="text-lg text-black font-bold mr-2 p-0"
          >
            {author.info.name.first} {author.info.name.last}
          </Button>{" "}
          <p className="text-gray-400 text-xs">
            <ReactTimeAgo date={meta.created_at} locale="en-SG" />
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto text-gray-500">
              <button>
                <Ellipsis />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              {loaderData.loggedInUserId === author._id && (
                <>
                  <DropdownMenuItem onClick={() => setIsEdit(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleDelete}
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
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
            <ReactionsCommentCard
              reactions={reactions.length}
              commentId={_id}
            />
          </div>

          <div className="flex items-center">
            <button className="mr-2">
              <MessageSquareText className="h-4" />
            </button>
            <p className="text-sm">
              <span className="font-bold">{formatter.format(repliesNum)} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
