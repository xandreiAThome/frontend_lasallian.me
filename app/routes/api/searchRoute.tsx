import axios from "axios";
import { redirect } from "react-router";
import { getUserObject, getUserToken } from "~/.server/sessions";
import PostCard from "~/components/homePageComponents/postCard";
import api from "~/lib/api";
import type { postDataInterface } from "~/lib/interfaces";
import type { Route } from "./+types/searchRoute";

// Helper function for checking if the query is a hashtag
const isHashtag = (query: string) => /^#[\w-]+$/.test(query);
// regex for matching multiple hashtags ^#[^#\s]+(?: #[^#\s]+)*$

export async function loader({ request }: Route.ActionArgs) {
  const userToken = await getUserToken(request);
  const userObj = await getUserObject(request);
  if (!userToken) {
    throw redirect("/");
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  // console.log("data: ", query);

  const hashtagQuery = decodeURIComponent(url.searchParams.get("query") || "");
  if (isHashtag(hashtagQuery)) {
    console.log("ITS A HASHTAG")
    const hashtag = hashtagQuery.slice(1);
    throw redirect(`/hashtag/${hashtag}`);
  }
  
  try {

    // Send to your API endpoint
    const response = await api.get(`${process.env.API_KEY}/post/search`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      params: { query: query },
    });

    // console.log("API responselol:", response.data.posts[0]);

    return {
      postData: response.data.posts as postDataInterface[] | null,
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

export default function Search({ loaderData }: Route.ComponentProps) {
  // console.log(loaderData.postData);
  return (
    <div className="basis-[640px] pt-6 flex flex-col gap-4 animate-fade-in">
      {loaderData?.postData &&
        loaderData.postData.map((props: postDataInterface, index: number) => {
          return <PostCard {...props} />;
        })}

      {(loaderData.postData === null || loaderData.postData?.length === 0) && (
        <h1 className="text-3xl text-center">No post found</h1>
      )}
    </div>
  );
}
