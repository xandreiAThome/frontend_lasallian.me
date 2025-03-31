import { BookPlus } from "lucide-react";
import PostCard from "~/components/homePageComponents/postCard";
import axios from "axios";
import api from "~/lib/api";
import profileImgDefault from "~/components/assets/profile.jpg";
import type { Route } from "./+types/homePageRoute";
import { getUserObject, getUserToken } from "~/.server/sessions";
import type { postDataInterface } from "~/lib/interfaces";
import CreatePostButton from "~/components/createPostComponents/CreatePostDialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useEffect, useState } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const userObj = await getUserObject(request);
  // console.log("jaengibg", userObj);
  // if (!userToken) {
  //   throw redirect("/");
  // }

  try {
    const response = await api.get(`${process.env.API_KEY}/post/all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    // console.log(response.data[0].comments[0].reactions);
    return {
      postData: response.data,
      loggedInUserId: userObj?._id,
      user: userObj,
      userToken: userToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
  return { loggedInUserId: userObj?._id, user: userObj, userToken: userToken };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const author = loaderData.user;
  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    async function getImg() {
      if (author?.vanity?.display_photo) {
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
  }, [author?.vanity?.display_photo]);
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4 animate-fade-in pb-6">
      <div className="bg-custom-postcard-white flex items-center px-6 rounded-xl py-4 shadow-lg w-full">
        <Avatar className="w-10 h-10 mr-2">
          <AvatarImage alt="@shadcn" src={profileImg ?? undefined} />
          <AvatarFallback className="flex flex-col bg-gray-300">
            <img src={profileImgDefault} alt="" />
          </AvatarFallback>
        </Avatar>

        <CreatePostButton
          buttonProp={
            <button className="hover:bg-slate-100 flex p-2 bg-gray-200 rounded-3xl text-base items-center px-4 w-full text-gray-500">
              <BookPlus className="mr-2" />
              <p>
                How's{" "}
                <span className="bg-bold text-gray-600 font-bold"> YOUR </span>{" "}
                day Lasallian Achiever?
              </p>
            </button>
          }
        />
      </div>
      {loaderData?.postData &&
        loaderData.postData.map((props: postDataInterface, index: number) => {
          return <PostCard {...props} key={props._id} />;
        })}
    </div>
  );
}
