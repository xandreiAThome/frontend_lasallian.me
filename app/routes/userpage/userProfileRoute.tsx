import PostCard from "~/components/homePageComponents/postCard";
import UserBannerCard from "~/components/userPageComponents/userBannerCard";
import type { authorInterface, postDataInterface } from "~/lib/interfaces";
import type { Route } from "./+types/userProfileRoute";
import { getUserObject, getUserToken } from "~/.server/sessions";
import api from "~/lib/api";
import axios from "axios";

export async function loader({ request, params }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userToken = await getUserToken(request);
  const userCookieObj = await getUserObject(request);
  let user = null;
  try {
    const response = await api.get(`${process.env.API_KEY}/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    user = response.data;

    // console.log("API response:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    user = userCookieObj;
  }

  // console.log("data: ", query);
  //TODO
  // console.log("us", params.userId);

  let userProfile: authorInterface | undefined;
  // checks if different profile from loggedInUser
  if (user?._id === params.userId) {
    userProfile = user;
  } else {
    try {
      const response = await api.get(
        `${process.env.API_KEY}/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log("lol", response.data);
      userProfile = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(" error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  try {
    const response = await api.get(
      `${process.env.API_KEY}/post/all/${userProfile?._id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(response.data);
    return {
      postData: response.data.posts,
      loggedInUserId: user?._id,
      user: userProfile,
      userToken: userToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { data: [], user: userCookieObj }; // Return a default value in case of error
  }
}
export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in pb-6">
      {loaderData.user && <UserBannerCard {...loaderData.user} />}

      {loaderData &&
        loaderData.postData.map(
          (
            {
              title,
              content,
              media,
              type,
              visibility,
              meta,
              author,
              comments,
              reactions,
              _id,
            }: postDataInterface,
            index: number
          ) => {
            return (
              <PostCard
                key={index}
                title={title}
                content={content}
                media={media}
                type={type}
                visibility={visibility}
                meta={meta}
                author={author}
                comments={comments}
                reactions={reactions}
                _id={_id}
              />
            );
          }
        )}
    </div>
  );
}
