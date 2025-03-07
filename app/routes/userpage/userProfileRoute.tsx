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
  const user = await getUserObject(request);
  console.log(params);

  // console.log("data: ", query);
  //TODO
  // console.log("us", params.userId);

  let userProfile: authorInterface | undefined;
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

      console.log("lol", response.data);
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
    const response = await api.get(`${process.env.API_KEY}/post/normal`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return {
      postData: response.data,
      loggedInUserId: user?._id,
      user: userProfile,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { data: [], user: userProfile }; // Return a default value in case of error
  }
}
export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="basis-[640px] flex flex-col gap-4 animate-fade-in">
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
                _id={_id}
              />
            );
          }
        )}
    </div>
  );
}
