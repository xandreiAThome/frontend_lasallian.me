import axios from "axios";
import { redirect, useParams } from "react-router";
import { getUserObject, getUserToken } from "~/.server/sessions";
import PostCard from "~/components/homePageComponents/postCard";
import api from "~/lib/api";
import type { postDataInterface } from "~/lib/interfaces";
import type { Route } from "./+types/searchRoute";

export async function loader({ request, params }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  const userObj = await getUserObject(request);
  const { hashtag } = params;
  
  if (!userToken) {
    throw redirect("/");
  }
  
  try {
    // Send to your API endpoint
    const response = await api.get(`${process.env.API_KEY}/post/hashtag/${hashtag}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    return {
      postData: response.data as postDataInterface[] | null,
      loggedInUserId: userObj?._id,
      user: userObj,
      userToken: userToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error:", error);
    } else {
      console.log("Unexpected error:", error);
    }
  }
  return {
    loggedInUserId: userObj?._id,
    user: userObj,
    userToken: userToken,
  };
}

export default function hashtag({ loaderData }: Route.ComponentProps) {
    // Hashtag
    console.log(loaderData)
    const {hashtag} = useParams<{hashtag: string}>();

    return (
      <div className="basis-[640px] pt-6 flex flex-col gap-4 animate-fade-in">
        <div className="bg-custom-postcard-white flex items-center justify-between px-6 rounded-xl py-4 shadow-lg w-full">
          <div className="flex flex-col">
            <h1 className="font-bold">#{hashtag}</h1>
            <p>{ loaderData?.postData?.length || "0"} Posts</p>
          </div>
          <button className="bg-lasalle-green text-white px-4 py-2 rounded-lg">Follow</button>
        </div>
        <div className="basis-[640px] pt-6 flex flex-col gap-4 animate-fade-in">
          {loaderData?.postData &&
            loaderData.postData.map((props: postDataInterface, index: number) => {
              return <PostCard {...props} />;
            })}
    
          {(loaderData.postData === null || loaderData.postData?.length === 0) && (
            <h1 className="text-3xl text-center">No post found</h1>
          )}
        </div>
      </div>
      
    );
}
